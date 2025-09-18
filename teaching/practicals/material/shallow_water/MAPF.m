function [u_new, v_new, h_new, Temp_new] = RK3(dx, dy, dt, g, u, v, h, Temp);
% This function performs one timestep of the Bott scheme
% applied to the shallow water equations

[r,c]=size(u);

h_new=zeros(r,c);
u_new=zeros(r,c);
v_new=zeros(r,c);
Temp_new=zeros(r,c);

% zonal wind - periodic b.c.
up05(1:r-1,:)=0.5.*(u(1:end-1,:)+u(2:end,:));
up05(r,:)=0.5.*(u(end,:)+u(1,:));

% meridional wind - free b.c.
vp05(:,1:c-1)=0.5.*(v(:,1:end-1)+v(:,2:end));
% vp05(:,c)=vp05(:,c-1); %0.5.*(v(:,end)+v(:,1));
vp05(:,[1 c])=0.;


hu=h.*u;
hv=h.*v;
minhu=0.; %min(hu(:));
minhv=0.;% min(hv(:));

hu=hu-minhu;
hv=hv-minhv;


u_new=u_new+minhu;
v_new=v_new+minhv;

u_new=u_new./h_new;
v_new=v_new./h_new;