function [u_new, v_new, h_new, Temp_new] = ...
    SEMILAGRANGE(dx, dy, dt, X,Y, g, u, v, h,Temp)
        
% % 1. Interpolate u to the face values
% [r,c]=size(u);
% % zonal wind - periodic b.c.
% up05(1:r-1,:)=0.5.*(u(1:end-1,:)+u(2:end,:));
% up05(r,:)=0.5.*(u(end,:)+u(1,:));
% um05(2:r,:)=0.5.*(u(1:end-1,:)+u(2:end,:));
% um05(1,:)=0.5.*(u(end,:)+u(1,:));
% % meridional wind - free b.c.
% vp05(:,1:c-1)=0.5.*(v(:,1:end-1)+v(:,2:end));
% vp05(:,c)=vp05(:,c-1); %0.5.*(v(:,end)+v(:,1));
% vm05(:,2:c)=0.5.*(v(:,1:end-1)+v(:,2:end));
% vm05(:,1)=vm05(:,2); %0.5.*(v(:,end)+v(:,1));

hu=u.*h;
hv=v.*h;

Xint=X-dt.*u;
Yint=Y-dt.*v;
% periodicity in x
ind=find(Xint(:)<min(X(:)));
Xint(ind)=Xint(ind)-min(X(:))+max(X(:));

ind=find(Xint(:)>max(X(:)));
Xint(ind)=Xint(ind)-max(X(:))+min(X(:));

Yint(find(Yint(:)<=min(Y(:))))=min(Y(:));
Yint(find(Yint(:)>=max(Y(:))))=max(Y(:));

% % use windfield to interpolate the scalar
% h_new=interp2(X',Y',h',Xint',Yint','linear')';
% hu_new=interp2(X',Y',hu',Xint',Yint','linear')';
% hv_new=interp2(X',Y',hv',Xint',Yint','linear')';
% Temp_new=interp2(X',Y',Temp',Xint',Yint','linear')';

% use windfield to interpolate the scalar
h_new=interp2(Y([end 1:end 1],:),[X(1,:)-dx; X;X(end,:)+dx],h([end 1:end 1],:),Yint,Xint,'linear');
hu_new=interp2(Y([end 1:end 1],:),[X(1,:)-dx; X;X(end,:)+dx],hu([end 1:end 1],:),Yint,Xint,'linear');
hv_new=interp2(Y([end 1:end 1],:),[X(1,:)-dx; X;X(end,:)+dx],hv([end 1:end 1],:),Yint,Xint,'linear');
Temp_new=interp2(Y([end 1:end 1],:),[X(1,:)-dx; X;X(end,:)+dx],Temp([end 1:end 1],:),Yint,Xint,'linear');

u_new=hu_new./h_new;
v_new=hv_new./h_new;

% h_new(:,[1 end])=h(:,[1 end]);



