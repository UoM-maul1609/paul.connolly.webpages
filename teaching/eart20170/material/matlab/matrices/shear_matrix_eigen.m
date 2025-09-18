
% define the X and Y coordinates of the image
[X,Y]=meshgrid([-10:0.1:10],[-10:0.1:10]);

% define a circle using polar coordinates and map onto Cartesians
TH=[0:0.01:2.*pi];
R=5.*ones(size(TH));
% R=5.*ones(size(TH))+sin(TH.*10);
[Xc,Yc] = pol2cart(TH,R);

% map onto the grid
IN = inpolygon(X,Y,Xc,Yc);
IN=double(IN);

% shear matrix
lambdax=1.5;
lambday=0;
Sh=[1 lambdax; lambday 1];
lambdax=0.;
lambday=0.3;
Sh2=[1 lambdax; lambday 1];
Sh=Sh*Sh2;

lambday=0.3;
% stretch matrix
St=[lambdax 0; 0 lambday];

% allocate memory for transformed matrix
Xct=zeros(size(Xc));
Yct=zeros(size(Yc));

% append X, Y coordinates into n-columns of [x,y] row vectors
xx=[Xc;Yc];
yy=zeros(size(xx));



figure('name','polygon');
% do the shear matrix:
subplot(2,1,1);
% transform each set of coordinates to new coordinates using matrix
% multiplication
yy=Sh*xx;

% find the shear axis by finding the eigenvectors
[V,L]=eig(Sh);

% plot the circle, ellipse and shear axis (i.e. a vector whos direction is not
% changed under the action of shear).
plot(xx(1,:),xx(2,:),'r');hold
plot(yy(1,:),yy(2,:),'g')

plot([0 V(1,1)],[0 V(2,1)],'k')
plot([0 V(1,2)],[0 V(2,2)],'k--')
axis equal
title('Shear along x - eigen vectors directed along x')
legend('Original feature','Sheared feature','Eigenvector 1','Eigenvector 2')
% do the stretch matrix:
subplot(2,1,2);
% transform each set of coordinates to new coordinates using matrix
% multiplication
yy=St*xx;

% find the stetch axis by finding the eigenvectors
[V,L]=eig(St);

% plot the circle, ellipse and shear axis (i.e. a vector whos direction is not
% changed under the action of shear).
plot(xx(1,:),xx(2,:),'r');hold
plot(yy(1,:),yy(2,:),'g')

plot([0 V(1,1)],[0 V(2,1)],'k')
plot([0 V(1,2)],[0 V(2,2)],'k--')
axis equal
title('Stretch along x / squash along y - eigen vectors directed along x and y')

% do an inverse stretch
zz=inv(St)*yy;
plot(zz(1,:),zz(2,:),'b--');hold

legend('Original feature','Stretched feature','Eigenvector 1','Eigenvector 2','Inverse stretch')


% calculate the matrix from the `observed data', xx, yy
St2=yy/xx;
