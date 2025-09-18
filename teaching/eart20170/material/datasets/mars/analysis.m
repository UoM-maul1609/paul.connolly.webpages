dat2=csvread('jim_18thSept2001.txt')
plot(dat2(:,5),dat2(:,3),'.','markersize',5) 
xlabel('\beta')
ylabel('IWC (g m^{-3})')
set(gca,'yscale','log','xscale','log')
hold on;grid;
P=polyfit(dat2(find(~isnan(dat2(:,5))),5),dat2(find(~isnan(dat2(:,5))),3),1);
plot(logspace(-8,-2,100),polyval(P,logspace(-8,-2,100)),'r')
P1=polyfit(log10(dat2(find( isfinite(log10(dat2(:,5)))&isfinite(log10(dat2(:,3)))  ) ,5)),...
    log10(dat2(find( isfinite(log10(dat2(:,5)))& isfinite(log10(dat2(:,3))) ) ,3)),1);
plot(logspace(-8,-2,100),10.^polyval(P1,log10(logspace(-8,-2,100))),'g')

% now read in mars data
figure
dat=dlmread('sol_101.txt',' ',1,0);
dat=dlmread('sol_109.txt',' ',1,0);
dat=dlmread('sol_119.txt',' ',1,0);
% dat=dlmread('sol_128.txt',' ',1,0);
plot(polyval(P,dat(:,6)),dat(:,1),'ro-','markersize',5);
hold;
plot(10.^polyval(P1,log10(dat(:,6))),dat(:,1),'g^-','markersize',5)
xlabel('IWC (g m^{-3})');
ylabel('altitude (m)');
ylim([1000 6000]);
title('Profile of ice water content in Martian clouds')



