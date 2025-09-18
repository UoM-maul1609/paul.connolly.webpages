function display_aves
% Read in the cloud fraction data and calculate a global mean for each
% month. Is the global mean >50%?

d=dir('A*_ice.csv');

N=length(d); % sample size
cloud_fraction=zeros(180,360);
for i=1:length(d)
   dat(:,:,i)=csvread(d(i).name); 
end
cloud_fraction=nanmean(dat(2:end,2:end,:),3);

long1=dat(1,2:end,1); % First row of data
lat1=dat(2:end,1,1);  % First column of data

pcolor(long1,lat1,cloud_fraction);shading flat;
colormap gray;
xlabel('longitude');
ylabel('latitude');
title('Ice cloud fraction for 2006-7')
colorbar

% Display coast line data
load coast
hold on;
plot(long,lat,'color',[1 1 1]); % plot in white [1 1 1]
axis equal;axis tight;
% Print the figure as a png
