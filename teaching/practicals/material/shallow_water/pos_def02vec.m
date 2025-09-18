function Qnew=pos_def02vec(U,Q,dx,dt,ord,BC)

global ord1;

monotonic=0;
ord1=5;
small=1e-30;
[r,jp]=size(Q);
f_plus=zeros(r,jp+ord1+2+ord1+3);
f_minus=zeros(r,jp+ord1+2+ord1+3);
fj1=zeros(r,jp+ord1+2+ord1+3);
fj2=zeros(r,jp+ord1+2+ord1+3);
Qold=zeros(r,jp+ord1+2+ord1+3);
u1=zeros(r,jp+ord1+2+ord1+3);

% zero arrays
f_plus(:)=0.;
f_minus(:)=0;
fj1(:)=0.;
fj2(:)=0.;
Qold(:)=0.;

% set field to advect
Qold(:,ord1+3:jp+ord1+2)=Q;
u1(:,ord1+3:jp+ord1+2)=U;
% u1(ord1+2)=u1(ord1+3)-diff(u1(ord1+3:ord1+4));

%     Qold(1:ord1+2)=Qold(ord1+3);
%     Qold(jp+ord1+3:end)=Q(end);
%     u1(1:ord1+2)=u1(ord1+3);;
%     u1(jp+ord1+3:end)=U(end);

% Boundary conditions
switch BC
    case 'periodic'
        Qold(:,jp+ord1+3:jp+ord1+2+ord1+3)=Q(:,1:ord1+3);
        Qold(:,1:ord1+2)=Q(:,jp-ord1-1:jp);
        u1(:,jp+ord1+3:jp+ord1+2+ord1+3)=U(:,1:ord1+3);
        u1(:,1:ord1+2)=U(:,jp-ord1-1:jp);
    case 'fixed'
        u1(:,jp+ord1+2:jp+ord1+2+ord1+3)=0.;
        u1(:,1:ord1+2)=0.;
        phi1=Q(:,1);
        phi2=Q(:,jp);
    otherwise 
        disp('Unknown method.')
end



% need to reference j-2 to j+1, but when calling coeff fn 
for j=ord1+3-2:jp+ord1+3-1 % flux out of the right boundary
    cp_j=(u1(:,j)+abs(u1(:,j))).*dt./dx.*0.5;
    cp_jp1=(u1(:,j+1)+abs(u1(:,j+1))).*dt./dx.*0.5;
    cp_jm1=(u1(:,j-1)+abs(u1(:,j-1))).*dt./dx.*0.5;
    cp_jm2=(u1(:,j-2)+abs(u1(:,j-2))).*dt./dx.*0.5;
    cm_j  =-(u1(:,j)-abs(u1(:,j))).*dt./dx.*0.5;
    cm_jm1=-(u1(:,j-1)-abs(u1(:,j-1))).*dt./dx.*0.5;
    cm_jp1=-(u1(:,j+1)-abs(u1(:,j+1))).*dt./dx.*0.5;
    
    % Deformation - Eq. 17 Bott, MWR (1992)
    dp_jm05=dx./dt.*Qold(:,j-1).*(cp_jm1-cp_jm2);
    dp_jp05=dx./dt.*Qold(:,j).*(cp_j-cp_jm1);
    dp_jp15=dx./dt.*Qold(:,j+1).*(cp_jp1-cp_j);
    dm_jp05=dx./dt.*Qold(:,j+1).*(cm_j-cm_jp1);
    dm_jm05=dx./dt.*Qold(:,j).*(cm_jm1-cm_j);
%     if(cp_j+cm_jm1>1)
%         disp(['Oh dear!']);
%         pause;
%     end
    % get coefficients for interpolation
    a_coeff01=coeff_pos_def01(Qold(:,:),j,ord);
    
   
    ind=find(u1(:,j) >= 0);
    if(monotonic ~= 1)
        for k=0:ord
            % step 1: calculate the non-monotone fluxes
            f_plus(ind,j)=f_plus(ind,j)+dx./dt.*a_coeff01(ind,k+1)./ ...
                ((1+k).*2.^(1+k)).*(1-(1-2.*cp_j(ind)).^(1+k));
        end
    else
        for k=0:ord
            % step 1: calculate the monotone fluxes
             f_plus(ind,j)=f_plus(ind,j)+dx./dt.*a_coeff01(ind,k+1)./ ...
                ((1+k).*2.^(1+k)).*(1-(1-2.*cp_jm1(ind)).^(1+k));
        end            
    end
    if(monotonic==1)
        % step 2: apply the monotone flux limiter
        ind=find(u1(:,j) >0 & u1(:,j-1) >0); 
       dummy1=dx./dt.*(Qold(ind,j)-max(Qold(ind,j-1),Qold(ind,j)))+f_plus(ind,j-1); 
       dummy2=dx./dt.*(Qold(ind,j)-min(Qold(ind,j-1),Qold(ind,j)))+f_plus(ind,j-1); 
       f_plus(ind,j)=min(dummy2,f_plus(ind,j));
       f_plus(ind,j)=max(dummy1,f_plus(ind,j));
       f_plus(ind,j)=min(dummy2,f_plus(ind,j));       
        % step 3: add the deformation terms, Eq. 21, Bott (1992)
        f_plus(ind,j)=f_plus(ind,j)+dp_jp05(ind);
    end
    % step 4: apply the positive definite flux limiter (as in bott, 1989)
    f_plus(:,j)=max(0.,f_plus(:,j));
    f_plus(:,j)=min(dx./dt.*Qold(:,j),f_plus(:,j));
end

for j=jp+ord1+3:-1:ord1+2 % flux into the boundary
    cp_j=(u1(:,j)+abs(u1(:,j))).*dt./dx.*0.5;
    cp_jp1=(u1(:,j+1)+abs(u1(:,j+1))).*dt./dx.*0.5;
    cp_jm1=(u1(:,j-1)+abs(u1(:,j-1))).*dt./dx.*0.5;
    cp_jm2=(u1(:,j-2)+abs(u1(:,j-2))).*dt./dx.*0.5;
    cm_j  =-(u1(:,j)-abs(u1(:,j))).*dt./dx.*0.5;
    cm_jm1=-(u1(:,j-1)-abs(u1(:,j-1))).*dt./dx.*0.5;
    cm_jp1=-(u1(:,j+1)-abs(u1(:,j+1))).*dt./dx.*0.5;
    
    % Deformation - Eq. 17 Bott, MWR (1992)
    dp_jp05=dx./dt.*Qold(:,j).*(cp_j-cp_jm1);
    dp_jp15=dx./dt.*Qold(:,j+1).*(cp_jp1-cp_j);
    dm_jp05=dx./dt.*Qold(:,j+1).*(cm_j-cm_jp1);
    dm_jm05=dx./dt.*Qold(:,j).*(cm_jm1-cm_j);
    
%     if(cp_j+cm_jm1>1)
%         disp(['Oh dear!']);
%         pause;
%     end
    % get coefficients for interpolation
    a_coeff01=coeff_pos_def01(Qold(:,:),j,ord);
%     a_coeff01=coeff_pos_def01(Qold(:),j,ord);
    
    % step 1: calculate the non-monotone fluxes
    ind=find(u1(:,j-1) < 0);
    if(monotonic ~=1)
        for k=0:ord
            f_minus(ind,j-1)=f_minus(ind,j-1)+dx./dt.*a_coeff01(ind,k+1)./ ...
                ((1+k).*2.^(1+k)).*((-1).^k).*(1-(1-2.*cm_jm1(ind)).^(1+k));
        end
    else
        for k=0:ord
             f_minus(ind,j-1)=f_minus(ind,j-1)+dx./dt.*a_coeff01(ind,k+1)./ ...
                ((1+k).*2.^(1+k)).*((-1).^k).*(1-(1-2.*cm_j(ind)).^(1+k));
        end           
    end
    if(monotonic==1)
        % step 2: apply the monotone flux limiter
        ind=find(u1(:,j) <0 & u1(:,j-1) < 0);
       dummy1=dx./dt.*(Qold(ind,j)-max(Qold(ind,j+1),Qold(ind,j)))+f_minus(ind,j); 
       dummy2=dx./dt.*(Qold(ind,j)-min(Qold(ind,j+1),Qold(ind,j)))+f_minus(ind,j); 
       f_minus(ind,j-1)=min(dummy2,f_minus(ind,j-1));
       f_minus(ind,j-1)=max(dummy1,f_minus(ind,j-1));
       f_minus(ind,j-1)=min(dummy2,f_minus(ind,j-1));       
        % step 3: add the deformation terms, Eq 21, Bott (1992)
        f_minus(ind,j-1)=f_minus(ind,j-1)+dm_jm05(ind);
    end
    % step 4: apply the positive definite flux limiter (as in bott, 1989)
    f_minus(:,j-1)=max(0.,f_minus(:,j-1));
    f_minus(:,j-1)=min(dx./dt.*Qold(:,j),f_minus(:,j-1));

% end
% for j=jp+ord1+3-1:-1:ord1+3 % flux into the boundary
    % step 4: continued... apply the second condition of positive definite
    % flux limiter for divergent flows
    a_coeff02=coeff_pos_def01(Qold(:,:),j+1,ord);
    i_jp1=zeros(r,1);
    i_j=zeros(r,1);
    for k=0:ord
       i_j=i_j+dx./dt.*a_coeff01(:,k+1)./( (1+k).*(2.^(1+k))).*(((-1).^k)+1);
       i_jp1=i_jp1+dx./dt.*a_coeff02(:,k+1)./( (1+k).*(2.^(1+k))).*(((-1).^k)+1);       
    end
    i_j=max(i_j,f_plus(:,j)+f_minus(:,j-1)+small);
    i_jp1=max(i_jp1,f_plus(:,j+1)+f_minus(:,j)+small); 
    
    % flux passing through j+0.5 face equal to stuff leaving and stuff
    % coming back through
    fj1(:,j)=dx./dt.*(f_plus(:,j)./i_j.*Qold(:,j)-f_minus(:,j)./i_jp1.*Qold(:,j+1));
    fj2(:,j)=dx./dt.*(f_plus(:,j)./i_j.*Qold(:,j)-f_minus(:,j)./i_jp1.*Qold(:,j+1));

%     if(j==ord1+3)
%         fj1(j)=0;
%         fj2(j)=0;
%     end
end

% update the field
% Qnew=Qold(ord1+3:jp+ord1+2)-dt./dx.*(fj(ord1+3:jp+ord1+2)-fj(ord1+2:jp+ord1+1));
Qnew=Qold(:,ord1+3:jp+ord1+2)-dt./dx.*(fj1(:,ord1+3:jp+ord1+2)-fj2(:,ord1+2:jp+ord1+1));


% Boundary conditions
switch BC
    case 'periodic'
%         Qold(jp+ord1+3:jp+ord1+2+ord1+3)=Q(1:ord1+2);
%         Qold(1:ord1+2)=Q(jp-ord1-1:jp);
%         u1(jp+ord1+3:jp+ord1+2+ord1+3)=U(1:ord1+2);
%         u1(1:ord1+2)=U(jp-ord1-1:jp);
    case 'fixed'
        Qnew(:,1)=phi1;
        Qnew(:,jp)=phi2;
    otherwise 
        disp('Unknown method.')    
end

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function A_COEFF=coeff_pos_def01(Q,j,ord)
global ord1;
[r,c]=size(Q);
A_COEFF=zeros(r,ord+1,1);
% j=j+ord1+2;
A_COEFF(:,1)=Q(:,j);

switch ord
    case 0
        
    case 1
		A_COEFF(:,2) = Q(:,j+1)-Q(:,j);
    case 2
		A_COEFF(:,2) = 0.5e0*(Q(:,j+1)-Q(:,j-1));
		A_COEFF(:,3) = 0.5e0*(Q(:,j+1)-2.e0*Q(:,j)+Q(:,j-1));
		% after Bott's reply to Smolarkiewicz's comment, the zeroth term changed 
		A_COEFF(:,1) = -1.e0/24.e0*(Q(:,j+1)-26.e0*Q(:,j)+Q(:,j-1));
    case 3
		A_COEFF(:,2) = (-Q(:,j+2)+6.e0*Q(:,j+1)-3.e0*Q(:,j)-2.e0*Q(:,j-1))/6.e0;
		A_COEFF(:,3) = (Q(:,j+1)-2.e0*Q(:,j)+Q(:,j-1))/2.e0;
		A_COEFF(:,4) = (Q(:,j+2)-3.e0*Q(:,j+1)+3.e0*Q(:,j)-Q(:,j-1))/6.e0;
    case 4
		A_COEFF(:,2) = (-Q(:,j+2)+8.*Q(:,j+1)-8.*Q(:,j-1)+Q(:,j-2))/12.;
		A_COEFF(:,3) = (-Q(:,j+2)+16.*Q(:,j+1)-30.*Q(:,j)+16.*Q(:,j-1)-Q(:,j-2))/24.;
		A_COEFF(:,4) = (Q(:,j+2)-2.*Q(:,j+1)+2.*Q(:,j-1)-Q(:,j-2))/12.;
		A_COEFF(:,5) = (Q(:,j+2)-4.*Q(:,j+1)+6.*Q(:,j)-4.*Q(:,j-1)+Q(:,j-2))/24.;
		% after Bott's reply, the 0th, 1st, 2nd term changed
		A_COEFF(:,1) = 1./1920.*(9.*Q(:,j+2)-116.*Q(:,j+1)+2134.*Q(:,j)-116.*Q(:,j-1)+9.*Q(:,j-2));
		A_COEFF(:,2) = 1./48.*(-5.*Q(:,j+2)+34.*Q(:,j+1)-34.*Q(:,j-1)+5.*Q(:,j-2));
		A_COEFF(:,3) = 1./48.*(-3.*Q(:,j+2)+36.*Q(:,j+1)-66.*Q(:,j)+36.*Q(:,j-1)-3.*Q(:,j-2));  
    case 5
		A_COEFF(:,1) = 1./1920.*(9.*Q(:,j+2)-116.*Q(:,j+1)+2134.*Q(:,j)-116.*Q(:,j-1)+9.*Q(:,j-2));
		A_COEFF(:,2) = 1./11520.*(259.*Q(:,j+3)-2236.*Q(:,j+2)+9455.*Q(:,j+1)-...
		  9455.*Q(:,j-1)+2236.*Q(:,j-2)-259.*Q(:,j-3));
		  
		A_COEFF(:,3) = 1./16.*(-Q(:,j+2)+12.*Q(:,j+1)-22.*Q(:,j)+12.*Q(:,j-1)-Q(:,j-2));
		A_COEFF(:,4) = 1./288.*(-7*Q(:,j+3)-52.*Q(:,j+2)-83.*Q(:,j+1)+83.*Q(:,j-1)-...
		  52.*Q(:,j-2)+7.*Q(:,j-3));
		  
		A_COEFF(:,5) = 1./24.*(Q(:,j+2)-4.*Q(:,j+1)+6.*Q(:,j)-4.*Q(:,j-1)+Q(:,j-2));
		A_COEFF(:,6) = 1./240.*(Q(:,j+3)-4.*Q(:,j+2)+5.*Q(:,j+1)-5.*Q(:,j-1)+4.*Q(:,j-2)-Q(:,j-3));
    case 6
		A_COEFF(:,1) = 1./107520.*(-75.*Q(:,j+3)+954.*Q(:,j+2)-7621.*Q(:,j+1)+...
		  121004.*Q(:,j)-7621.*Q(:,j-1)+954.*Q(:,j-2)-75.*Q(:,j-3));
		  
		A_COEFF(:,2) = 1./11520.*(259.*Q(:,j+3)-2236.*Q(:,j+2)+9455.*Q(:,j+1)-...
		  9455.*Q(:,j-1)+2236.*Q(:,j-2)-259.*Q(:,j-3));
		  
		A_COEFF(:,3) = 1./3840.*(37*Q(:,j+3)-462.*Q(:,j+2)+3435.*Q(:,j+1)-6020.*Q(:,j)+...
		  3435.*Q(:,j-1)-462.*Q(:,j-2)+37.*Q(:,j-3));
		  
		A_COEFF(:,4) = 1./288.*(-7*Q(:,j+3)+52.*Q(:,j+2)-83.*Q(:,j+1)+83.*Q(:,j-1)-...
		  52.*Q(:,j-2)+7.*Q(:,j-3));
		  
		A_COEFF(:,5) = 1./576.*(-5.*Q(:,j+3)+54.*Q(:,j+2)-171.*Q(:,j+1)+244.*Q(:,j)-...
		  171.*Q(:,j-1)+54.*Q(:,j-2)-5.*Q(:,j-3));
		  
		A_COEFF(:,6) = 1./240.*(Q(:,j+3)-4.*Q(:,j+2)+5.*Q(:,j+1)-5.*Q(:,j-1)+...
		  4.*Q(:,j-2)-Q(:,j-3));
		  
		A_COEFF(:,7) = 1./720.*(Q(:,j+3)-6.*Q(:,j+2)+15.*Q(:,j+1)-20.*Q(:,j)+...
		  15.*Q(:,j-1)-6.*Q(:,j-2)+Q(:,j-3))	;
         
    case 7
		A_COEFF(:,1) = 1./107520.*(-75.*Q(:,j+3)+954.*Q(:,j+2)-7621.*Q(:,j+1)+ ...
		  121004.*Q(:,j)-7621.*Q(:,j-1)+954.*Q(:,j-2)-75.*Q(:,j-3));
		
		A_COEFF(:,2) = 1./645120.*(-3229.*Q(:,j+4)+33878.*Q(:,j+3)-170422.*Q(:,j+2)+ ...
		  574686.*Q(:,j+1)-574686.*Q(:,j-1)+170433.*Q(:,j-2)-33878.*Q(:,j-3)+3229.*Q(:,j-4));
		
		A_COEFF(:,3) = 1./3840.*(37*Q(:,j+3)-462.*Q(:,j+2)+3435.*Q(:,j+1)-6020.*Q(:,j)+ ...
		  3435.*Q(:,j-1)-462.*Q(:,j-2)+37.*Q(:,j-3));
		
		A_COEFF(:,4) = 1./23040.*(141.*Q(:,j+4)-1406*Q(:,j+3)+6134.*Q(:,j+2)-...
		  8614.*Q(:,j+1)+8614.*Q(:,j-1)-6134.*Q(:,j-2)+1406.*Q(:,j-3)-141.*Q(:,j-4));
		
		A_COEFF(:,5) = 1./576.*(-5.*Q(:,j+3)+54.*Q(:,j+2)-171.*Q(:,j+1)+ ...
		  244.*Q(:,j)-171.*Q(:,j-1)+54.*Q(:,j-2)-5.*Q(:,j-3));
		
		A_COEFF(:,6) = 1./1920.*(-3.*Q(:,j+4)+26.*Q(:,j+3)-74.*Q(:,j+2)+82.*Q(:,j+1)- ...
		  82.*Q(:,j-1)+74.*Q(:,j-2)-26.*Q(:,j-3)+3.*Q(:,j-4));
		
		A_COEFF(:,7) = 1./720.*(Q(:,j+3)-6.*Q(:,j+2)+15.*Q(:,j+1)-20.*Q(:,j)+ ...
		  15.*Q(:,j-1)-6.*Q(:,j-2)+Q(:,j-3));
		A_COEFF(:,8) = 1./10080.*(Q(:,j+4)-6.*Q(:,j+3)+14.*Q(:,j+2)-14.*Q(:,j+1)+...
		  14.*Q(:,j-1)-14.*Q(:,j-2)+6.*Q(:,j-3)-Q(:,j-4));	
        
    case 8
		A_COEFF(:,1) = 1./10321920.*(1225.*Q(:,j+4)-17000.*Q(:,j+3)+125884.*Q(:,j+2)- ...
		  800216.*Q(:,j+1)+11702134.*Q(:,j)-800216.*Q(:,j-1)+125884.*Q(:,j-2)-...
		  17000.*Q(:,j-3)+1225.*Q(:,j-4));
		
		A_COEFF(:,2) = 1./645120.*(-3229.*Q(:,j+4)+33878.*Q(:,j+3)-170422.*Q(:,j+2)+ ...
		  574686.*Q(:,j+1)-574686.*Q(:,j-1)+170433.*Q(:,j-2)-33878.*Q(:,j-3)+3229.*Q(:,j-4));
		
		A_COEFF(:,3) = 1./1935360.*(-3229.*Q(:,j+4)+44480.*Q(:,j+3)-323260.*Q(:,j+2)+...
		  1912064.*Q(:,j+1)-3260110.*Q(:,j)+1912064.*Q(:,j-1)-323260.*Q(:,j-2)+...
		  44480.*Q(:,j-3)-3229.*Q(:,j-4));
		
		A_COEFF(:,4) = 1./23040.*(141.*Q(:,j+4)-1406*Q(:,j+3)+6134.*Q(:,j+2)-...
		  8614.*Q(:,j+1)+8614.*Q(:,j-1)-6134.*Q(:,j-2)+1406.*Q(:,j-3)-141.*Q(:,j-4));
		  
		A_COEFF(:,5) = 1./27648.*(47.*Q(:,j+4)-616.*Q(:,j+3)+3908.*Q(:,j+2)-...
		  10840.*Q(:,j+1)+15002.*Q(:,j)-10840.*Q(:,j-1)+3908.*Q(:,j-2)-616.*Q(:,j-3)+47.*Q(:,j-4));
		  
		A_COEFF(:,6) = 1./1920.*(-3.*Q(:,j+4)+26.*Q(:,j+3)-74.*Q(:,j+2)+82.*Q(:,j+1)-...
		  82.*Q(:,j-1)+74.*Q(:,j-2)-26.*Q(:,j-3)+3.*Q(:,j-4));
		  
		A_COEFF(:,7) = 1./17280.*(-7.*Q(:,j+4)+80.*Q(:,j+3)-340.*Q(:,j+2)+752.*Q(:,j+1)-...
		  970.*Q(:,j)+752.*Q(:,j-1)-340.*Q(:,j-2)+80.*Q(:,j-3)-7.*Q(:,j-4));	
		  
		A_COEFF(:,8) = 1./10080.*(Q(:,j+4)-6.*Q(:,j+3)+14.*Q(:,j+2)-14.*Q(:,j+1)+...
		  14.*Q(:,j-1)-14.*Q(:,j-2)+6.*Q(:,j-3)-Q(:,j-4));
		A_COEFF(:,9) = 1./40320.*(Q(:,j+4)-8.*Q(:,j+3)+28.*Q(:,j+2)-56.*Q(:,j+1)+...
		  70.*Q(:,j)-56.*Q(:,j-1)+28.*Q(:,j-2)-8.*Q(:,j-3)+Q(:,j-4));   
    otherwise
        disp('Order unknown');
        pause;
        return;
end