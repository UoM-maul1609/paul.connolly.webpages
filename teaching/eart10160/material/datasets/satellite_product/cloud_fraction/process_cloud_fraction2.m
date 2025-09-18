function [means]=process_cloud_fraction2
% Read in the cloud fraction data and calculate a global mean for each
% month. Is the global mean >50%?

d=dir('A*_all.csv');

N=length(d); % sample size
means=zeros(size(d));
for i=1:length(d)
   dat=csvread(d(i).name); 
   cloud_fraction=dat(2:end,2:end);
   means(i)=nanmean(cloud_fraction(:));
   
%    % problem:
%    [longs,lats]=meshgrid(dat(1,2:end),dat(2:end,1));
%    weighted=cloud_fraction.*cos(lats.*pi./180);
%    means(i)=nanmean(weighted(:));
end

% Is mean cloud cover >0.5? test at the 5% significance level
t_statistic=abs((mean(means)-0.5)./(std(means)./sqrt(N)))

t_critical=abs(tinv(0.05,N-1))

if(t_critical>t_statistic)
    disp(['Accept the null hypothesis:', ...
        'there is no difference between 0.5 and the sample data']);
else
    disp(['Reject the null hypothesis:', ...
        'there is a difference between 0.5 and the sample data']);
end
