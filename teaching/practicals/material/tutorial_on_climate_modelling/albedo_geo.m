function tsurface=albedo_geo(albedo_geog,frac_tot,co2ppm)

sigma_s=5.67e-8;
patm=1d5;
solar_flux=1368d0;
ch4ppm=1.75;

cloud_fraction=0.70;
albedo_clear=0.15;
albedo_c=0.356;
frac_tot1=0.175.*frac_tot;

albedo_p=(cloud_fraction-frac_tot1).*albedo_c+...
    (1-(cloud_fraction-frac_tot1)).*albedo_clear+frac_tot1.*albedo_geog;

teff=(solar_flux./4.*(1-albedo_p)./sigma_s).^0.25;

eco2=co2ppm.*1e-6.*patm;
ech4=ch4ppm.*1e-6.*patm;
eh2o=1e2.*0.18;

tau_co2=0.029d0.*sqrt(eco2);
tau_ch4=0.029d0.*25.*sqrt(ech4);
tau_h2o=0.087d0.*sqrt(eh2o);


tau=tau_co2+tau_ch4+tau_h2o;

tsurface=teff.*(1+0.75.*tau).^0.25;



