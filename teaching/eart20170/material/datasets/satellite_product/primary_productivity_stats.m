d=dir('*360x180*');

for i=1:length(d)
    dat(:,:,i)=csvread(d(i).name);
end
dat(find(dat(:)==99999))=NaN;
dat(:,:,:)=dat(:,:,:).*30;

lat=linspace(90,-89.5,180);
lon=linspace(-179.5,180,360);
[lon1,lat1]=meshgrid(lon,lat);

% calculate the annual npp
dat_t=dat.*repmat(cos(lat1.*pi./180),[1 1 12]);
% NPP=nanmean(dat(:)).*length(find(~isnan(dat(:))))./180./360./12.*...
%     4.*pi.*6.4e6.^2.*365
NPP=dat.*repmat(pi./180.*cos(pi./180.*lat1).*pi./180.*6.4e6.^2,[1 1 12]);
NPP=repmat(pi./180.*cos(pi./180.*lat1).*pi./180.*6.4e6.^2,[1 1 12]);
% NPP=dat.*4.*pi.*6.4e6.^2./(180.*360);
NPP=nansum(NPP(:))
% for i=1:length(d)
%    subplot(4,3,i)
%    dat1=dat(:,:,i);
%    hist(dat1(:),40);
% end
% 
% for i=1:12
%     datlat_m(:,i)=squeeze(nanmean(dat(:,:,i),2))';
% %     datlat_s(:,i)=squeeze(nanstd(dat(:,:,i),2))';
% end
