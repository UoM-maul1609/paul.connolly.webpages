% Solve on a grid out to 3 earth radii, 
x=linspace(-3.*6.4e6,3.*6.4e6,50);    
[X,Y]=meshgrid(x,x); % x-z plane


% Declare empty arrays for storing the forces due to sphere
forcex=zeros(50,50); 
forcey=zeros(50,50); 
forcez=zeros(50,50); 

h = waitbar(0,'Please wait calculating gravity field for sphere...');
for i=1:50
    for j=1:50
        [forcex(i,j),forcey(i,j),forcez(i,j),net_force]=gravity_sampling01([X(i,j) 0 Y(i,j)],'sphere');
    end
    waitbar(i/50,h);
end
close(h);

% Declare empty arrays for storing the forces due to ellipsoid
forcexe=zeros(50,50); 
forceye=zeros(50,50); 
forceze=zeros(50,50); 

h = waitbar(0,'Please wait calculating gravity field for ellipsoid...');
for i=1:50
    for j=1:50
        [forcexe(i,j),forceye(i,j),forceze(i,j),net_force]=gravity_sampling01([X(i,j) 0 Y(i,j)],'ellipse');
    end
    waitbar(i/50,h);
end
close(h);

% Declare empty arrays for storing the forces due to cylinder
forcexc=zeros(50,50);
forceyc=zeros(50,50); 
forcezc=zeros(50,50); 

h = waitbar(0,'Please wait calculating gravity field for cylinder...');
for i=1:50
    for j=1:50
        [forcexc(i,j),forceyc(i,j),forcezc(i,j),net_force]=gravity_sampling01([X(i,j) 0 Y(i,j)],'cylinder');
    end
    waitbar(i/50,h);
end
close(h);

% Declare empty arrays for storing the forces due to cube
forcexcu=zeros(50,50); 
forceycu=zeros(50,50); 
forcezcu=zeros(50,50); 

h = waitbar(0,'Please wait calculating gravity field for cube...');
for i=1:50
    for j=1:50
        [forcexcu(i,j),forceycu(i,j),forcezcu(i,j),net_force]=gravity_sampling01([X(i,j) 0 Y(i,j)],'cube');
    end
    waitbar(i/50,h);
end
close(h);

% Plot out
figure
subplot(221)
pcolor(X,Y,sqrt(forcex.^2+forcey.^2+forcez.^2));shading interp
axis equal;axis tight;
h=colorbar
xlabel(h,'g (m s^{-2})');
xlabel('distance (m)');ylabel('distance (m)');
hold on;
h=streamslice(X,Y,forcex,forcez,1);
set(h,'color','r','linewidth',0.5)
title('Sphere');

subplot(222)
pcolor(X,Y,sqrt(forcexe.^2+forceye.^2+forceze.^2));shading interp
axis equal;axis tight;
h=colorbar
xlabel(h,'g (m s^{-2})');
xlabel('distance (m)');ylabel('distance (m)');
hold on;
h=streamslice(X,Y,forcexe,forceze,1);
set(h,'color','r','linewidth',0.5)
title('Ellipse');


subplot(223)
pcolor(X,Y,sqrt(forcexc.^2+forceyc.^2+forcezc.^2));shading interp
axis equal;axis tight;
h=colorbar
xlabel(h,'g (m s^{-2})');
xlabel('distance (m)');ylabel('distance (m)');
hold on;
h=streamslice(X,Y,forcexc,forcezc,1);
set(h,'color','r','linewidth',0.5)
title('Cylinder');

subplot(224)
pcolor(X,Y,sqrt(forcexcu.^2+forceycu.^2+forcezcu.^2));shading interp
axis equal;axis tight;
h=colorbar
xlabel(h,'g (m s^{-2})');
xlabel('distance (m)');ylabel('distance (m)');
hold on;
h=streamslice(X,Y,forcexcu,forcezcu,1);
set(h,'color','r','linewidth',0.5)
title('Cube');

 
