% Display the cloud fraction for September 2012
dat=csvread('C201209_all.csv');

% parse 'dat' into long, lat and cloud fraction. 
long1=dat(1,2:end); % First row of data
lat1=dat(2:end,1);  % First column of data
cloud_fraction=dat(2:end,2:end); % rest of the data

figure('name','Cloud fraction')
[c,h]=contourf(long1,lat1,smoothn(cloud_fraction,[7 7]));
clabel(c,h);
colormap gray;
xlabel('longitude');
ylabel('latitude');
title('Cloud fraction for September 2012')
colorbar

% Display coast line data
load coast
hold on;
plot(long,lat,'color',[1 1 1]); % plot in white [1 1 1]
axis equal;axis tight;

% Print the figure as a png
print -dpng contour_cf.png