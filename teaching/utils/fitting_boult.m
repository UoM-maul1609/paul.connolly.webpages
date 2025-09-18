Q=[27.14,26.54,25.50,24.03,21.96,20.32,18.33,21.79,28.35,31.72,57.46,56.51,51.59,49.09,43.12,39.15,35.61,35.18,35.18,35.87,35.95,35.78,36.47,35.26,31.03,27.23,23.26,24.38,24.64,24.03,22.13,21.01,20.92,19.71,17.38,15.05,14.44,14.53,15.14,15.65];
C=[
13.38,13.16,13.11,13.25,13.71,14.11,14.81,12.92,10.50,9.37,5.76,5.38,5.36,5.21,5.43,5.57,5.74,5.56,5.32,5.01,4.78,4.59,4.32,4.26,4.60,5.01,5.64,5.26,5.06,5.05,5.33,5.47,5.38,5.58,6.19,7.03,7.22,7.08,6.70,6.39
];
pH=[
5.73,5.82,5.81,5.85,5.85,5.87,5.86,5.82,5.79,5.86,4.81,4.59,4.58,4.59,4.57,4.63,4.63,4.67,4.70,4.74,4.78,4.82,4.86,4.89,4.90,4.94,4.94,4.96,4.97,5.00,5.03,5.05,5.05,5.08,5.05,5.04,5.04,5.04,5.04,5.09
];

logQ=log10(Q);
logC=log10(C);
%figure 3
ind=12:17
P3=polyfit(logQ(ind),logC(ind),1);
R3=corr2(logQ(ind),logC(ind));
% figure 4
ind=1:11;
P4=polyfit(logQ(ind),logC(ind),1);
R4=corr2(logQ(ind),logC(ind));
% figure 5
ind=24:40;
ind=12:40;
P5=polyfit(logQ(ind),logC(ind),1);
R5=corr2(logQ(ind),logC(ind));

plot(logQ,logC);hold on;
x=linspace(1.2,1.8,20);
plot(x,polyval(P3,x),'r');
plot(x,polyval(P4,x),'g');
plot(x,polyval(P5,x),'b');

t=R5./sqrt((1-R5^2)./(length(ind)-2));
p=tcdf(t,length(ind)-2)*2;


% ph
Hp=10.^-pH;
bob=Hp.*141300;
rest=C-bob;
logECpH=log10(rest);
%figure 6
ind=1:11
P6=polyfit(logQ(ind),logECpH(ind),1);
R6=corr2(logQ(ind),logC(ind));
% figure 7
ind=12:40;
P7=polyfit(logQ(ind),logECpH(ind),1);
R7=corr2(logQ(ind),logECpH(ind));


figure;
plot(logQ,logECpH);hold on;
plot(x,polyval(P6,x),'r');
plot(x,polyval(P7,x),'g');

%-------------

ta=[0;3;5;8;10;12;15;17;24;31;38;40;43;45];
na=[10;15;26;52;104;186;270;284;407;520;530;544;582;560];
tb=[0;7;11;16;22;28;35;42;50;60;75;90;110;120];
nb=[2;20;37;50;70;100;120;145;170;200;250;300;400;600];

% N=KN0/(N0+(K-N0)*exp(-r*t)) 
% small t - exp ~ 1, so becomes exponential
% large t exp << 1 1 so becomes equal to K
fun=@(beta,x)(beta(1).*beta(2)./(beta(2)+(beta(1)-beta(2)).*exp(-beta(3).*x)));

beta_a = nlinfit(ta,na,fun,[500,10,0.3]);
beta_b = nlinfit(tb,nb,fun,[500,10,0.3]);

plot(ta,na,'b'); hold on;
plot(ta,fun(beta_a,ta),'r')

plot(tb,nb,'--b'); hold on;
plot(tb,fun(beta_b,tb),'r--')
