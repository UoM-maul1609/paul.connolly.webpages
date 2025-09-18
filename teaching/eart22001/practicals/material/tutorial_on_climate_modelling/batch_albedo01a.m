% file to call the climate model lots of times

% set inputs
albedo_c=linspace(0.38,0.5,40);
cloud_fraction=0.7;
ch4ppm=1.75;
co2ppm=385:5:2.*385;
% co2ppm=300:400;

I=length(albedo_c);
J=length(co2ppm);


% calculate the surface temperature as an output
tsurface=zeros(I,J);
albedo_p=zeros(I,J);
energy=zeros(I,J);
for i=1:I
    for j=1:J
        [tsurface(i,j),albedo_p(i,j),energy(i,j)]=albedo01a(albedo_c(i),cloud_fraction,co2ppm(j),ch4ppm);
    end
end

% plot out data
figure
pcolor(co2ppm,albedo_c,tsurface-273.15);shading flat;
xlabel('CO_2 (ppm)');ylabel('A_c');
h=colorbar;ylabel(h,'T (^\circ C)');

% figure
% plot(albedo_c,albedo_p(:,1).*1368-albedo_p(1,1).*1368);
% % plot(albedo_p(:,1),albedo_p(:,1).*1368-albedo_p(1,1).*1368);
% xlabel('A_c');ylabel('Shortwave radiative effect (W m^{-2})');

figure
pcolor(co2ppm,albedo_c,energy-energy(1,1));shading flat
xlabel('CO_2 (ppm)');ylabel('A_c');
h=colorbar;ylabel(h,'Total radiative forcing');

% figure
% plot(co2ppm,energy(1,:)-energy(1,1))
% xlabel('CO_2 (ppm)');
