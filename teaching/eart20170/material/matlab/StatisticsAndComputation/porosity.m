function yhat = porosity(beta, x)
b1 = beta(1);
b2 = beta(2);

yhat = (250e-6.^2./b2).*x.^b1;
yhat = b1.*x + 2.*real(log10(250e-6)) - real(log10(b2));
