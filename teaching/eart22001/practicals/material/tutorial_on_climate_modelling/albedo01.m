function tsurface=albedo01(albedo_c,cloud_fraction,co2ppm,ch4ppm)

sigma_s=5.67e-8;        % Stefan-Boltzmann constant
patm=0.5d5;             % average pressure, Pa
solar_flux=1368d0;      % solar flux at top of atmosphere

% cloud_fraction=0.70;    % fraction of earth covered by clouds
albedo_clear=0.15;      % albedo of clear sky
% albedo_c=0.35;         % albedo of clouds


% the planetary albedo
albedo_p=(cloud_fraction).*albedo_c+...
    (1-cloud_fraction).*albedo_clear;

% surface temperature
teff=(solar_flux./4.*(1-albedo_p)./sigma_s).^0.25;

eco2=co2ppm.*1e-6.*patm; % partial pressure of co2
ech4=ch4ppm.*1e-6.*patm; % partial pressure of ch4
eh2o=1e2.*0.18;          % partial pressure of water vapour - do not change

% optical depths
tau_co2=0.029d0.*sqrt(eco2);
tau_ch4=0.029d0.*25.*sqrt(ech4);
tau_h2o=0.087d0.*sqrt(eh2o);


% total optical depth in the infrared
tau=tau_co2+tau_ch4+tau_h2o;

tsurface=teff.*(1+0.75.*tau).^0.25; % surface temperature



