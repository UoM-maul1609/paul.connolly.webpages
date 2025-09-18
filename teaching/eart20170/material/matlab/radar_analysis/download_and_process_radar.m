function [DATA,RAD1]=download_and_process_radar
%links http://www2.wetter3.de/Animation_00_UTC/00_2.gif -source  > ${dir1}/wetter3/${dat2}/${dat1}_00_700hPa_rh_analy.gif

[lon,lat,data]=m_gtopo([-12.063 4.2 48.73 59.41]);
data1=data;
data1(find(isnan(data1(:))))=0.;
data1=smoothn(data1,[11 11]);
[FX,FY]=gradient(data1);

normgrad=sqrt(FX.^2+FY.^2);
RAD1.accum=zeros(834,740);

% dates=datenum(2010,8,30,0,0,0):(60./60)./24:now;
dates=datenum(2012,9,24,0,0,0):1./24:now;
str1=['!links http://www.raintoday.co.uk/radarimage2/']; %...
%     2012-07-02%20',...
%     20:00
str2=':00/48.73445537176822/59.41154816642368/-12.06298828125/4.19677734375/740/834/1mp1qgteql3q49d0h5ypwhqqzz0ntvoc/rainfall/obs -source  > /tmp/obs.gif';


h = waitbar(0,'Please wait...');
l=1;flag=0;
% for i=2000:2010 %length(dates)
for i=1:10 %length(dates)
    str=[str1,strrep(datestr(dates(i),26),'/','-'),'%20',datestr(dates(i),15),str2];
    eval(str);
    try
%         if(l==1)
            DAT=process_radar_images('/tmp/obs.gif');
%         else
%             DAT=process_radar_images('/tmp/obs.gif',DAT);        
%         end
        flag=0;
        RAD=interp2(DAT.XLONG,DAT.XLAT,DAT.A1(:,:,1),lon,lat);
        ind=find(RAD(:)>0.06);
        DATA(l).RAD=RAD(ind);
        DATA(l).ind=ind;
        DATA(l).HGT=data1(ind);
        DATA(l).FX=FX(ind);
        DATA(l).FY=FY(ind);
        DATA(l).normgrad=normgrad(ind);
        DATA(l).date=dates(i);
        
        RAD1.accum=RAD1.accum+DAT.A1(:,:,1);
        l=l+1;
    catch
       disp(['Problems:: ', num2str(flag)]);
       flag=1;
       dates(i)=[]; 
       save /tmp/radartest.mat DATA dates i l;
    end
    waitbar(i/length(dates),h);
end
close(h);
try
    RAD1.normgrad=normgrad;
    RAD1.data1=data1;
    RAD1.lon=lon;
    RAD1.lat=lat;
    RAD1.fx=FX;
    RAD1.fy=FY;
    RAD1.XLONG=DAT.XLONG;
    RAD1.XLAT=DAT.XLAT;
catch
end