% SHALLOW WATER EQUATION MODEL
% Paul Connolly, University of Manchester (adapted from practical by Robin
% Hogan)
% 
% The equations are cast in conservative form and consist of 3 prognostic
% variables, h, u and v.
%
% -------------------------------------------------------------------------

% SECTION 1: define variables
% Specify the range of heights to plot in metres
plot_height_range = [9500 10500];
fac=1;                      % increase resolution by this factor
dt_mins              = 1./fac;   % Timestep (minutes)
output_interval_mins = 60;  % Time between outputs (minutes)
forecast_length_days = 4;   % Total simulation length (days)
initially_geostrophic = true;
add_random_height_noise = true;

g = 9.81;                   % Acceleration due to gravity (m/s2)
% zonal jet
f = 1.0e-4;                 % Coriolis parameter (s-1)
beta = 1.6e-11;             % Meridional gradient of f (s-1m-1)

% % equatorial easterly
% f=0.;
% beta=2.5e-11;
% equatorial kelvin wave
% f=0.;
% beta=5e-10;

nx=254.*fac;                     % Number of zonal gridpoints
ny=50.*fac;                      % Number of meridional gridpoints
 
dx=100.0e3./fac;                 % Zonal grid spacing (m)
dy=dx;                      % Meridional grid spacing

x=(0:nx-1).*dx;             % zonal distance coordinates (m)
y=(0:ny-1).*dy;             % Meridional distance coordinates

[Y,X]=meshgrid(y,x); % create matrices of zonal and meridional coords.

dt = dt_mins*60.0; % Timestep (s)
output_interval = output_interval_mins*60.0; % Time between outputs (s)
forecast_length = forecast_length_days*24.0*3600.0; % Forecast length (s)
nt = fix(forecast_length/dt)+1; % Number of timesteps
timesteps_between_outputs = fix(output_interval/dt);
noutput = ceil(nt/timesteps_between_outputs); % Number of output frames

H=zeros(nx,ny);             % Height of orography

% This is for a zonal jet
height = 10000 - tanh(20.0.*((Y-mean(y))./max(y))).*400;

% % equatorial easterly
% height = 10000 - 50.*cos((Y-mean(y)).*4.*pi./max(y));

% % Gaussian blob
% std_blob = 8.0.*dy; % Standard deviation of blob (m)
% height = 9750 + 1000.*exp(-((X-0.25.*mean(x)).^2+(Y-mean(y)).^2)./(2* ...
%                                                  std_blob^2));
% % sharp shear
% mean_wind_speed = 50; % m/s
% height = (mean_wind_speed*f/g).*abs(Y-mean(y));
% height = 10000+height-mean(height(:));

% Temperature, function of distance from equator
Temp=300 - 30.*abs((Y)./max(y)); 
% % Temperature, function of distance from equator
% Temp=300 - 50.*abs((Y-mean(y))./max(y)); 
% Coriolis parameter as a matrix of values varying in y only
F = f+beta.*(Y-mean(y));

% Initialize the wind to rest
u=zeros(nx, ny);
v=zeros(nx, ny);

% We may need to add small-amplitude random noise in order to initialize 
% instability
if add_random_height_noise
  height = height + 1.0.*rand(size(height)).*(dx./1.0e5).*(abs(F)./1e-4);
end

if initially_geostrophic
   % 0-gd(h+H)/dx+fv
   % 0=-gd(h+H)/dy-fu

   % Centred spatial differences to compute geostrophic wind
   % Hence, this is an un-staggerred grid
   u(:,2:end-1) = -(0.5.*g./(F(:,2:end-1).*dx)) ...
       .* (height(:,3:end)-height(:,1:end-2));
   v(2:end-1,:) = (0.5.*g./(F(2:end-1,:).*dx)) ...
       .* (height(3:end,:)-height(1:end-2,:));
   v([1 end],:) = v([2 end-1],:);
   % Zonal wind is periodic so set u(1) and u(end) as dummy points that
   % replicate u(end-1) and u(2), respectively
   u([1 end],:) = u([2 end-1],:);
   % Meridional wind must be zero at the north and south edges of the
   % channel 
   v(:,[1 end]) = 0;

%    % Don't allow the initial wind speed to exceed 200 m/s anywhere
%    max_wind = 200;
%    u(find(u>max_wind)) = max_wind;
%    u(find(u<-max_wind)) = -max_wind;
%    v(find(v>max_wind)) = max_wind;
%    v(find(v<-max_wind)) = -max_wind;
end

% Define h as the depth of the fluid (whereas "height" is the height of
% the upper surface)
h = height - H;

% Initialize the 3D arrays where the output data will be stored
u_save = zeros(nx, ny, noutput);
v_save = zeros(nx, ny, noutput);
h_save = zeros(nx, ny, noutput);
Temp_save = zeros(nx, ny, noutput);
t_save = zeros(1, noutput);

% Index to stored data
i_save = 1;
% ------------------------------------------------------------------

% SECTION 2: Main loop
for n = 1:nt
  % Every fixed number of timesteps we store the fields
  if mod(n-1,timesteps_between_outputs) == 0
    max_u = sqrt(max(u(:).*u(:)+v(:).*v(:)));
    disp(['Time = ' num2str((n-1)*dt/3600) ...
	  ' hours (max ' num2str(forecast_length_days*24) ...
		   '); max(|u|) = ' num2str(max_u)]);
    u_save(:,:,i_save) = u;
    v_save(:,:,i_save) = v;
    h_save(:,:,i_save) = h;
    Temp_save(:,:,i_save) = Temp;
    t_save(i_save) = (n-1).*dt;
    i_save = i_save+1;
  end


  H1=H+h;
  % Compute the accelerations
  u_accel = F(:,:).*v;
  % Centred difference
  u_accel(2:end-1,:)=u_accel(2:end-1,:) ...
      - (g/(2*dx)).*(H1(3:end,:)-H1(1:end-2,:));
  % Periodic b.c.
  u_accel(1,:)=u_accel(1,:) ...
      - (g/(2*dx)).*(H1(2,:)-H1(end,:));
  u_accel(end,:)=u_accel(end,:) ...
      - (g/(2*dx)).*(H1(1,:)-H1(end-1,:));
  
  v_accel = -F(:,:).*u;
  % Centred b.c.
  v_accel(:,2:end-1)=v_accel(:,2:end-1) ...
      - (g/(2*dy)).*(H1(:,3:end)-H1(:,1:end-2));
  % Free b.c.
  v_accel(:,1)=v_accel(:,1) ...
      - (g/(2*dy)).*(H1(:,3)-H1(:,1));
  v_accel(:,end)=v_accel(:,end) ...
      - (g/(2*dy)).*(H1(:,end)-H1(:,end-2));

  
  u=u+u_accel.*dt;
  v=v+v_accel.*dt;

%   [unew, vnew, h_new,Temp_new] = MPDATA(dx, dy, dt, X, Y, g, u, v, h,Temp);
%   [unew, vnew, h_new,Temp_new] = SEMILAGRANGE(dx, dy, dt, X, Y, g, u, v, h,Temp);

  [unew, vnew, h_new] = lax_wendroff_pjc(dx, dy, dt, g, u, v, h);
  
%  [unew,vnew,h_new,Temp_new] = MAPF(dx,dy,dt,g,u,v,h,Temp);
%   [unew,vnew,h_new,Temp_new] = RK3(dx,dy,dt,g,u,v,h,Temp);
  u=unew;
  v=vnew;
  v(:,[1 end])=0;
%   Temp(:,2:end-1)=Temp_new(:,2:end-1);
  h=h_new;
end

disp('Now run "animate" to animate the simulation');
