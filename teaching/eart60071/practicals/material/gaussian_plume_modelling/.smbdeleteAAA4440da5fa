function [C1,x,y]=gaussian_plume
dxy=100;
x=-2500:dxy:2500;
y=x;
days=365;
% days=50;
C1=zeros(length(x),length(y),days.*24);
C1=zeros(length(x),length(y),days.*24);
[x,y]=meshgrid(x,y);
z=zeros(size(x));
wind_speed=5.*ones(days.*24,1); % m/s
wind_dir=360.*rand(days.*24,1);
wind_dir=linspace(0,360,days.*24);
% wind_dir=norminv(rand(days.*24,1),200,40);
% wind_dir(find(wind_dir>=360))=...
%     mod(wind_dir(find(wind_dir>=360)),360);

Q=40; % mass emitted per unit time
% For all times...
for i=1:length(wind_dir)
    C=gauss_func(Q,wind_speed(i),wind_dir(i),x,y,z);
    C1(:,:,i)=C;
end

function C=gauss_func(Q,u,dir1,x,y,z)
H=50; % stack height, m
Dy=10;
Dz=10;

% Here we calculate the distance downwind:
% components of u:
wx=u.*sin((dir1-180).*pi./180);
wy=u.*cos((dir1-180).*pi./180);

% Need angles, so use scalar product:
dot_product=wx.*x+wy.*y;
% product of magnitude of vectors:
magnitudes=u.*sqrt(x.^2+y.^2); 
% Needed to calculate distance downwind:
subtended=acos(dot_product./magnitudes);
hypotenuse=sqrt(x.^2+y.^2);

downwind=cos(subtended).*hypotenuse;

% Now calculate distance cross wind.
crosswind=sin(subtended).*hypotenuse;

ind=find(downwind>0);
C=zeros(size(downwind));

sig_y=sqrt(2.*Dy.*downwind./u);
sig_z=sqrt(2.*Dz.*downwind./u);

C(ind)=Q./(2.*pi.*u.*sig_y(ind).*sig_z(ind)) ...
    .*exp(-crosswind(ind).^2./(2.*sig_y(ind)).^2).* ...
    (exp(-(z(ind)-H).^2./(2.*sig_z(ind).^2))+ ...
    exp(-(z(ind)+H).^2./(2.*sig_z(ind).^2)) );
