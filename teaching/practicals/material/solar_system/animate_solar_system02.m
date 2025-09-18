% create animation of solar system
figure('renderer','openGL','position',[2    32   800   663]);

% Plot the paths of the planets
for j=1:9
    h(j)=plot3(y(:,1+j*6)-y(:,1),y(:,2+j*6)-y(:,2),y(:,3+j*6)-y(:,3),'linewidth',0.5);hold on;
end

axis equal
xlabel('x (m)');
ylabel('y (m)');
zlabel('z (m)');

%view([-2.3809   -2.2521    0.0000    2.3165
%    1.1561   -1.3024    0.8480   -0.3509
%    1.8502   -2.0843   -0.5299   24.1209
%         0         0         0    1.0000]);
     
col={[0.5 0.5 0.5],'g','b','r','r','g','b','b','c'};

% Scale the sizes of the planets (log-scale because they look weird scaled linearly)
sz=log([4850 12000 12000 6790 142980 120536 51118 49500 2368]./0.00001);
k=1;

%for i=1:100:24800

% Loop over all frames
for i=1:1:length(t)
    for j=1:9
        h(j)=plot3(y(i,1+j*6)-y(i,1),y(i,2+j*6)-y(i,2),y(i,3+j*6)-y(i,3),...
            '.','color',col{j},'markersize',sz(j));hold on;
    end
    pause(0.1);
%    eval(['print -dpng pics/frame',num2str(k,'%03d'),'.png']);
    k=k+1;
    delete(h);
end
