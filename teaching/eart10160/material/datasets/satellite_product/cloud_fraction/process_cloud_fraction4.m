function [means1,means2]=process_cloud_fraction4
% Read in the cloud fraction data and calculate a global mean for each
% month. Is the global mean fraction of liquid clouds greater than ice
% clouds?

d1=dir('A*_all.csv'); 
d2=dir('C*_all.csv');

N1=length(d1); % sample size
N2=length(d2); % sample size
means1=zeros(size(d1));
means2=zeros(size(d2));
for i=1:length(d1)
   dat1=csvread(d1(i).name); 
   cloud_frac_2006=dat1(2:end,2:end);
   means1(i)=nanmean(cloud_frac_2006(:));   
end
for i=1:length(d2)
   dat2=csvread(d2(i).name); 
   cloud_frac_2011=dat2(2:end,2:end);
   means2(i)=nanmean(cloud_frac_2011(:));   
end

% Is mean liquid cloud cover > mean ice cloud cover?
% test at the 10% significance level
Sp2=(N1-1).*std(means1).^2+(N2-1).*std(means2).^2;
Sp2=Sp2./((N1-1)+(N2-1));
t_statistic=abs((mean(means1)-mean(means2))./(sqrt(Sp2./N1+Sp2./N2)) )

t_critical=abs(tinv(0.10,N1+N2-2))

if(t_critical>t_statistic)
    disp(['Accept the null hypothesis:', ...
        'there is no between the first year and the second year']);
else
    disp(['Reject the null hypothesis:', ...
        'there one year is cloudier than the other']);
end
