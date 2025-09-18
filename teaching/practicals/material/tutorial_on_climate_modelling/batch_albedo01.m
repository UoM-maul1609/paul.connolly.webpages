% file to call the climate model lots of times

% set inputs
albedo_c=linspace(0.38,0.5,40);
cloud_fraction=0.7;
ch4ppm=1.75;
co2ppm=385:5:2.*385;

I=length(albedo_c);
J=length(co2ppm);

% [co2ppm,albedo_c]=meshgrid(co2ppm,albedo_c); % what does meshgrid do?

% calculate the surface temperature as an output
tsurface=zeros(I,J);
for i=1:I
    for j=1:J
        tsurface(i,j)=albedo01(albedo_c(i),cloud_fraction,co2ppm(j),ch4ppm);
    end
end

% tsurface=albedo01(albedo_c,cloud_fraction,co2ppm,ch4ppm);
% plot out data
figure
pcolor(co2ppm,albedo_c,tsurface-273.15);shading flat;
xlabel('CO_2 (ppm)');ylabel('A_c');
h=colorbar;ylabel(h,'T (^\circ C)');