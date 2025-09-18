function [forcex,forcey,forcez,mag_force]=gravity_sampling01(R1,varargin)
% script to estimate gravity
% R1=[0 0 Re];    % position of observer in (x,y,z)

shape='cube'; % either have 'sphere', 'ellipse', 'cylinder', 'cube'
if(nargin>1) shape=varargin{1}; end; % this allows you to input the shape. nargin is the number of inputs
plot_flag=true; % set to true if you want a plot of the mass elements

n_points=100; % number of points to sample the 3-d space per dimension
n_sample=n_points.^3; % total number of points in the 3-d space
Re=6.4e6; % radius of earth
volume=4./3.*pi.*Re.^3; % volume of earth


me=6e24;  % mass of earth
G=6.67e-11; % gravitational constant

% Use of a switch statement in MATLAB to select the shape
switch shape
    case 'sphere'
        x=linspace(-Re,Re,n_points); % grid running from -Re to +Re
        [X,Y,Z]=meshgrid(x,x,x); % generate meshgrid for each dimension
        R=sqrt(X.^2+Y.^2+Z.^2);  % the distance of each grid point from (0,0,0)
        ind=find(R(:)./Re<=1);      % find all points within sphere
%         R1=[0 0 Re];    % position of observer
    case 'ellipse'
        % volume of ellipsoid is 4/3*pi*abc
        % let b and c equal 1./ar of a: v=4/3*pi*a^3./ar.^2
        ar=2; % aspect ratio
        a=(volume*3./4./pi.*ar.^2).^(1./3);
        b=a./ar;
        len=max([a b]);
        x=linspace(-len,len,n_points); % grid running from -len to +len
        [X,Y,Z]=meshgrid(x,x,x); % generate meshgrid for each dimension
        ind=find((sqrt(X.^2+Y.^2)./(b)).^2+(Z./a).^2<1);
%         R1=[b 0 0];    % position of observer this is on the semi-minor axis
%         R1=[0 0 a];    % position of observer this is on the semi-major axis
    case 'cylinder'
        % volume of cylinder is pi a^2h
        % let h equal ar times 2a: v=2arpi*a^3
        ar=2; % aspect ratio
        a=(volume./ar./pi./2).^(1./3);
        h=2.*ar.*a;
        len=max([a h./2]);
        x=linspace(-len,len,n_points); % grid running from -dim to +dim
        [X,Y,Z]=meshgrid(x,x,x); % generate meshgrid for each dimension
        ind=find(sqrt(X.^2+Y.^2)<a & Z<h./2 & Z>-h./2);   
%         R1=[0 0 h./2];    % position of observer
%         R1=[a 0 0];    % position of observer
    case 'cube'
        % volume=a^3
        a=(volume).^(1./3);
        x=linspace(-a./2,a./2,n_points); % grid running from -a to +a
        [X,Y,Z]=meshgrid(x,x,x); % generate meshgrid for each dimension
        ind=find(X<=a./2 & X>=-a./2 & Y<=a./2 & Y>=-a./2 & Z<=a./2 & Z>=-a./2);
%         R1=[0 0 a];    % position of observer
    otherwise
        disp('Not defined');
        return
end
X=X(ind);                % remove those points outside of sphere
Y=Y(ind);
Z=Z(ind);


mel=me./length(X);       % mass of a single element


% Newton's law of gravitation in x, y, z directions
forcex=-sum(G.*1.*mel./((R1(1)-X).^2+(R1(2)-Y).^2+(R1(3)-Z).^2).^1.5.*(R1(1)-X)); % force equation
forcey=-sum(G.*1.*mel./((R1(1)-X).^2+(R1(2)-Y).^2+(R1(3)-Z).^2).^1.5.*(R1(2)-Y)); % force equation
forcez=-sum(G.*1.*mel./((R1(1)-X).^2+(R1(2)-Y).^2+(R1(3)-Z).^2).^1.5.*(R1(3)-Z)); % force equation

% net force - magnitude of a vector
mag_force=sqrt(forcex.^2+forcey.^2+forcez.^2);

if(plot_flag==true)
   figure('renderer','opengl');
   plot3(X(:),Y(:),Z(:),'k.','markersize',4);
   hold on;
   plot3(R1(1),R1(2),R1(3),'r.','markersize',50);
   axis equal;
end