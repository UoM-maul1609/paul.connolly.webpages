function [u_new, v_new, h_new, Temp_new] = RK3(dx, dy, dt, g, u, v, h, Temp);
% This function performs one timestep of the Bott scheme
% applied to the shallow water equations

[r,c]=size(u);

hu=h.*u;
hv=h.*v;

h_new=zeros(r,c);
u_new=zeros(r,c);
v_new=zeros(r,c);
Temp_new=zeros(r,c);

% zonal wind - periodic b.c.
up05x(1:r-1,:)=0.5.*(u(1:end-1,:)+u(2:end,:));
up05x(r,:)=0.5.*(u(end,:)+u(1,:));

hup05x(1:r-1,:)=0.5.*(hu(1:end-1,:)+hu(2:end,:));
hup05x(r,:)=0.5.*(hu(end,:)+hu(1,:));

up05y(:,1:c-1)=0.5.*(u(:,1:end-1)+u(:,2:end));
up05y(:,c)=0.5.*(u(:,c-1)+u(:,c));

hup05y(:,1:c-1)=0.5.*(hu(:,1:end-1)+hu(:,2:end));
hup05y(:,c)=0.5.*(hu(:,c-1)+hu(:,c));



% meridional wind - free b.c.
vp05y(:,1:c-1)=0.5.*(v(:,1:end-1)+v(:,2:end));
vp05y(:,[1 c])=0.;

hvp05y(:,1:c-1)=0.5.*(hv(:,1:end-1)+hv(:,2:end));
hvp05y(:,[1 c])=0.;

vp05x(1:r-1,:)=0.5.*(v(1:end-1,:)+v(2:end,:));
vp05x(r,:)=0.5.*(v(end,:)+v(1,:));
vp05x(:,[1 c])=0.;

hvp05x(1:r-1,:)=0.5.*(hv(1:end-1,:)+hv(2:end,:));
hvp05x(r,:)=0.5.*(hv(end,:)+hv(1,:));
hvp05x(:,[1 c])=0.;


minhu=0.; %min(hu(:));
minhv=0.;% min(hv(:));

hu=hu-minhu;
hv=hv-minhv;

h_new=rk3_run(h,u,v,dx,dy,dt);
u_new=rk3_run(hu,u,v,dx,dy,dt);
v_new=rk3_run(hv,u,v,dx,dy,dt);
Temp_new=rk3_run(Temp,u,v,dx,dy,dt);



u_new=u_new+minhu;
v_new=v_new+minhv;

u_new=u_new./h_new;
v_new=v_new./h_new;

function % dhu/dt+d(uhu) /dt+d(vhu)/dt=0.
u_new=u-dt.*( (up05x(2:end,2:end-1).*hup05x(2:end,2:end-1)-...
    up05x(1:end-1,2:end-1).*hup05x(1:end-1,2:end-1)  )./dx +...
    (up05(2:end-1,2:end).*hup05y(2:end-1,2:end))./dy );

