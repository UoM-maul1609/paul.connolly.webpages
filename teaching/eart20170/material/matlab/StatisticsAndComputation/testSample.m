
sZ1=100000;
sZ2=20;
sZ3=10000;
std11=5;
mea11=10.;
dat1=norminv(rand(sZ1,1),mea11,std11);
method='e1';
% dat2=norminv(rand(sZ1,1),5,2);

switch method
case 'c1'
	% Try sampling about 20 and calculating x_bar a thousand times
	xbar1=zeros(sZ3,1);
	xbar2=zeros(sZ3,1);
	std1=zeros(sZ3,1);
	std2=zeros(sZ3,1);
	for i=1:sZ3
        ran1=ceil(rand(sZ2,1).*sZ1);    
        ran2=ceil(rand(sZ2,1).*sZ1);    
        
        xbar1(i)=mean(dat1(ran1));
        xbar2(i)=mean(dat1(ran2));
        
        std1(i)=std(dat1(ran1));
        std2(i)=std(dat1(ran2));
	end
	std1(end)=std11;
	std2(end)=std11;
	
	% Calculate theoretical curve
	Sp=(sZ2-1).*std1(end).^2+(sZ2-1).*std2(end).^2;
	Sp=sqrt(Sp./(sZ2+sZ2-2));
	tcalc=(xbar1(end)-xbar2(end))./Sp;
	tcalc=tcalc./sqrt((1./sZ2+1./sZ2));
	numera=Sp.*sqrt((1./sZ2+1./sZ2));
	
	% The critical value
	alpha1=[0.01 0.05 0.1 0.2 0.3 0.4 0.5];
	[N,X]=hist(xbar1-xbar2,50);
	y=cumsum(N(1:end-1)./sum(N(1:end-1)));
	x=X(1:end-1);
	for i=1:length(alpha1)
		tcrit=tinv(alpha1(i),sZ2+sZ2-2);
		distance1(i)=numera.*tcrit;
        % Simulated limits
		inds1=find(y<=alpha1(i));
		inds2=find(y>alpha1(i));
        % linear interpolation
        xpos(i)=x(inds1(end))+...
            (x(inds2(1))-x(inds1(end)))./ ...
            (y(inds2(1))-y(inds1(end))).*(alpha1(i)-y(inds1(end)));
            
	end
	% stairs(X(1:end-1),N(1:end-1)./sum(N(1:end-1))./diff(X))
	subplot(211);
	plot(X(1:end-1),cumsum(N(1:end-1)./sum(N(1:end-1))))
	subplot(212);
	plot(xpos,distance1,'o');
	refline(1,0);
case 'e1'
	xbar1=zeros(sZ3,1);
	std1=zeros(sZ3,1);
	for i=1:sZ3
        ran1=ceil(rand(sZ2,1).*sZ1);        
        xbar1(i)=mean(dat1(ran1));
        std1(i)=std(dat1(ran1));
	end  
	% Calculate theoretical curve
	tcalc=(xbar1(end)-mea11)./std11./sqrt(sZ2);
	numera=std11./sqrt(sZ2);
	
	% The critical value
	alpha1=[0.01 0.05 0.1 0.2 0.3 0.4 0.5];
	[N,X]=hist(xbar1-mea11,50);
	y=cumsum(N(1:end-1)./sum(N(1:end-1)));
	x=X(1:end-1);
	for i=1:length(alpha1)
		tcrit=tinv(alpha1(i),sZ2-1);
		distance1(i)=numera.*tcrit;
        % Simulated limits
		inds1=find(y<=alpha1(i));
		inds2=find(y>alpha1(i));
        % linear interpolation
        xpos(i)=x(inds1(end))+...
            (x(inds2(1))-x(inds1(end)))./ ...
            (y(inds2(1))-y(inds1(end))).*(alpha1(i)-y(inds1(end)));
            
	end
	% stairs(X(1:end-1),N(1:end-1)./sum(N(1:end-1))./diff(X))
	subplot(211);
	plot(X(1:end-1),cumsum(N(1:end-1)./sum(N(1:end-1))))
	subplot(212);
	plot(xpos,distance1,'o');
	refline(1,0);
case 'p1'
    
    
end