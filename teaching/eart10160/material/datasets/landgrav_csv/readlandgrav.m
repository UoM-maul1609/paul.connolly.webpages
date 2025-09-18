
% dat=dlmread('landgrav.csv',',',[1 3 153674 10]);

% [dat.lat,dat.lon,dat.elev,dat.bouguer,dat.obs_grav]=...
%     textread('landgrav.csv','%*s, %*s, %*f, %f, %f, %*f, %*f, %f, %f, %*f, %f, %*s,%*s,%*s,%*s,%*s,%*s,%*s,%*s','headerlines',1);
[test]=...
    textread('landgrav.csv','%[^\n]\n','headerlines',1);
[test1]=...
    textread('landgrav_sea.csv','%[^\n]\n','headerlines',1);
lat=zeros(length(test),1);
lon=zeros(length(test),1);
elev=zeros(length(test),1);
boug_dens=zeros(length(test),1);
obs_grav=zeros(length(test),1);
boug_an=zeros(length(test),1);
for i=1:length(test)
   ind=findstr(test{i},',');
   lat(i)=str2num(test{i}(ind(3)+1:ind(4)-1));
   lon(i)=str2num(test{i}(ind(4)+1:ind(5)-1));
   elev(i)=str2num(test{i}(ind(7)+1:ind(8)-1));
   boug_dens(i)=str2num(test{i}(ind(9)+1:ind(10)-1));
   obs_grav(i)=str2num(test{i}(ind(11)+1:ind(12)-1));
   boug_an(i)=str2num(test{i}(ind(17)+1:ind(18)-1));
end

for i=1:length(test1)
   ind=findstr(test1{i},',');
   lat(i+length(test))=str2num(test1{i}(ind(3)+1:ind(4)-1));
   lon(i+length(test))=str2num(test1{i}(ind(4)+1:ind(5)-1));
   elev(i+length(test))=str2num(test1{i}(ind(7)+1:ind(8)-1));
   boug_dens(i+length(test))=str2num(test1{i}(ind(9)+1:ind(10)-1));
   obs_grav(i+length(test))=str2num(test1{i}(ind(11)+1:ind(12)-1));
   boug_an(i+length(test))=str2num(test1{i}(ind(17)+1:ind(18)-1));
end
% dat=csvread('landgrav.csv',1,3,[1 3 153675 10]);
obs_grav1=obs_grav;
obs_grav1(find(obs_grav==999999))=NaN;

m_proj('UTM','lat',[48 62],'lon',[-10 2]);
%m_proj('UTM','long',[136.2 141],'lat',[-37.5 -34.3]);
m_gshhs_i('color','k');
m_grid('box','fancy','tickdir','in');
hold;
[x,y]=m_ll2xy(lon,lat);
scatter(x,y,6,obs_grav1,'filled')


lon1=linspace(-10,2,200);
lat1=linspace(48,62,200);
[lon1,lat1]=meshgrid(lon1,lat1);
Z=griddata(lon,lat,obs_grav1,lon1,lat1);
