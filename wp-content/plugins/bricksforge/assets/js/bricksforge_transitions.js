class BricksforgeTransitions{settings={};newDOM=null;newDOMDocument=null;constructor(){"undefined"!=typeof BRFTRANSITIONS&&(this.settings=BRFTRANSITIONS)}init(){bricksIsFrontend&&this.loadSwup()}async loadSwup(){let e=this.settings.containers?this.settings.containers:["#brx-content"];-1!==e.indexOf(",")&&(e=e.split(","),e=e.map((e=>e.trim()))),"string"==typeof e&&(e=[e]);let t=this.settings.morphContainers?this.settings.morphContainers:[];-1!==t.indexOf(",")&&(t=t.split(","),t=t.map((e=>e.trim()))),"string"==typeof t&&(t=[t]);let i=[new SwupHeadPlugin,new SwupBodyClassPlugin,new SwupA11yPlugin,new SwupMorphPlugin({containers:t})];if(this.settings.animationType&&"gsap"==this.settings.animationType){let e=await this.getAnimations();e&&e.length?i.push(new SwupJsPlugin({animations:e})):console.warn("No animations found to create the page transition.")}let n={containers:e,animationScope:this.settings.animationScope?this.settings.animationScope:"html",animateHistoryBrowsing:!this.settings.animateHistoryBrowsing||this.settings.animateHistoryBrowsing,cache:!!this.settings.cache&&this.settings.cache,linkSelector:this.settings.linkSelector?this.settings.linkSelector:"a[href]:not(.bricks-lightbox)",animationSelector:'[class*="brf-page-transition"]',plugins:i,linkToSelf:"navigate"};"css"!=this.settings.animationType&&(n.cache=!1);const r=new Swup(n);r.hooks.on("link:click",(e=>{let t=e.trigger.el;if(t){if(t.closest(".brxe-offcanvas")){let e=t.closest(".brxe-offcanvas");e&&e.classList.remove("brx-open")}if(t.closest(".bricks-mobile-menu-wrapper")){let e=t.closest(".bricks-mobile-menu-wrapper"),i=e.closest(".brxe-nav-menu"),n=i.querySelector(".bricks-mobile-menu-toggle");e&&(i.classList.remove("show-mobile-menu"),n.setAttribute("aria-expanded","false"),document.body.classList.remove("no-scroll"))}this.handleUserScriptsClick(e)}})),r.hooks.on("page:view",(e=>{const t=e.to.html;this.newDOM=t;const i=new DOMParser;this.newDOMDocument=i.parseFromString(t,"text/html"),this.refreshPostId(),this.handleStylesheets(),this.handleScripts(),this.handleInlineScripts(),this.handleMenuItems(),this.handleAdminBar(),setTimeout((()=>{this.handleBricksScripts(),this.handleBricksforgeScripts(),this.handleUserScripts()}),75)}))}async getAnimations(){if(!this.settings.gsapAnimations)return[];let e=[];for(let t=0;t<this.settings.gsapAnimations.length;t++){let i=this.settings.gsapAnimations[t],n=i.gsapType?i.gsapType:"timeline",r=i.from?i.from:"(.*)",s=i.to?i.to:"(.*)",o=i.code1?i.code1:"",c=i.code2?i.code2:"",a=(i.timelineId1&&i.timelineId1,i.timelineId2&&i.timelineId2,null==i.onInit||i.onInit);if(o)try{o=new Function("done",o)}catch(e){console.error("Error parsing or executing animationCode1:",e)}if(c)try{c=new Function("done",c)}catch(e){console.error("Error parsing or executing animationCode2:",e)}let l={};switch(n){case"timeline":let e=await brfPanel.getTimelines(),t=!1;if(!e||!e.length){console.warn("No timelines found.");break}let n=await this.getTimeline1(i),u=await this.getTimeline2(i);n||u||console.warn("Timeline not found."),n&&!u&&(t=!0,u=n),a?t?(u.tl.pause(1),u.tl.reverse()):u.tl.play():u.tl.pause(1),l={from:r,to:s,out:async(e,t)=>this.checkRoutes(i,t)?n?(await n.tl.restart(),e()):void 0:e(),in:async(e,n)=>this.checkRoutes(i,n)?u?(t?(u.tl.pause(),u.tl.reverse()):await u.tl.restart(),e()):void 0:e()};break;case"custom":l={from:r,to:s,out:async(e,t)=>this.checkRoutes(i,t)?o(e):e(),in:async(e,t)=>this.checkRoutes(i,t)?c(e):e()}}l&&l.from&&e.push(l)}return e}async getTimeline1(e){return(await brfPanel.getTimelines()).find((t=>t.id===e.timelineId1))}async getTimeline2(e){return(await brfPanel.getTimelines()).find((t=>t.id===e.timelineId2))}checkRoutes(e,t){return("(.*)"==t.from.pattern||t.from.pattern==t.from.url)&&("(.*)"==t.to.pattern||t.to.pattern==t.to.url)}refreshPostId(){const e=this.newDOMDocument.querySelector("main[data-post-id]");if(e){let t=e.getAttribute("data-post-id");t&&(window.bricksData.postId=t)}}handleStylesheets(){this.newDOMDocument.querySelectorAll("link[href]").forEach((e=>{e.id&&"core-framework-frontend-css"===e.id&&this.handleDelayedCSS(e,10),-1===document.head.innerHTML.indexOf(e.outerHTML)&&-1===document.body.innerHTML.indexOf(e.outerHTML)&&document.head.insertAdjacentHTML("beforeend",e.outerHTML)})),this.newDOMDocument.querySelectorAll("style").forEach((e=>{e.id||(e.id="brf-pjax-inline-css-"+Math.random().toString(36).substring(7));(["bricks-frontend-inline-inline-css","bricks-dynamic-data-inline-css","bricks-advanced-themer-inline-css","woocommerce-inline-inline-css","bricks-frontend-inline-css","global-styles-inline-css","bricksforge-style-inline-css","bricks-global-classes-inline-inline-css"].includes(e.id)||e.id.includes("brf-pjax-inline-css"))&&-1===document.head.innerHTML.indexOf(e.outerHTML)&&-1===document.body.innerHTML.indexOf(e.outerHTML)&&document.head.insertAdjacentHTML("beforeend",e.outerHTML)}))}handleDelayedCSS(e,t=10,i=[]){const n=e.id;setTimeout((()=>{let t=document.querySelector("#"+n);t&&t.remove(),document.head.insertAdjacentHTML("beforeend",e.outerHTML)}),t)}handleAdminBar(){const e=this.newDOMDocument.querySelector("#wpadminbar");if(e){const t=document.querySelector("#wpadminbar");t&&t.remove(),document.body.insertAdjacentHTML("beforeend",e.outerHTML)}}handleScripts(){let e=this.newDOMDocument.querySelectorAll("script[src]");e=this.handleBricksforgeDependencies(e),e.forEach((async e=>{if(-1!==e.src.indexOf("bricksforge_transitions.js"))return;if(-1!==e.src.indexOf("swup"))return;let t=e.src,i=e.id;if((-1!==document.head.innerHTML.indexOf(t)||-1!==document.body.innerHTML.indexOf(t))&&"bricks-scripts-js"!=e.id)return;if("bricksforge-gltf-loader-js"==i||"bricksforge-orbit-controls-js"==i)return void setTimeout((()=>{const e=document.createElement("script");e.src=t,e.id=i;const n=document.querySelector("#bricksforge-transitions-js");n.parentNode.insertBefore(e,n.previousSibling)}),350);const n=document.createElement("script");n.src=t,n.id=i;const r=document.querySelector("#bricksforge-transitions-js");r.parentNode.insertBefore(n,r.previousSibling)}))}handleInlineScripts(){this.newDOMDocument.querySelectorAll("script:not([src])").forEach((e=>{if(document.head.innerHTML.includes(e.innerHTML)||document.body.innerHTML.includes(e.innerHTML))return;if(this.scriptHasUndefindedDependencies(e))return;(()=>{try{const t=document.createElement("script");t.innerHTML=e.innerHTML;let i=e.getAttribute("type");i&&t.setAttribute("type",i);let n=e.getAttribute("id");n&&t.setAttribute("id",n),document.body.appendChild(t)}catch(e){console.error("Error executing script: ",e)}})()}))}scriptHasUndefindedDependencies(e){return!(!e.innerHTML.includes("wp.")||"undefined"!=typeof wp)}handleMenuItems(){document.querySelectorAll(".current-menu-item").forEach((e=>{e.classList.remove("current-menu-item")}));this.newDOMDocument.querySelectorAll(".current-menu-item").forEach((e=>{if(!e||!e.id)return;let t=document.querySelector("."+e.id);t&&t.classList.add("current-menu-item")}));const e=this.newDOMDocument.querySelectorAll(".brxe-text-link[aria-current=page]");document.querySelectorAll(".brxe-text-link[aria-current=page]").forEach((e=>{e.removeAttribute("aria-current")})),e.forEach((e=>{if(!e||!e.href)return;let t=document.querySelector(".brxe-text-link[href='"+e.href+"']");t&&t.setAttribute("aria-current","page")}))}handleBricksforgeDependencies(e){let t=Array.from(e),i=t.find((e=>"bricksforge-elements-js"===e.id));return i&&(t=t.filter((e=>"bricksforge-elements-js"!==e.id)),t.push(i)),t}handleBricksScripts(){"function"==typeof bricksMultilevelMenu&&bricksMultilevelMenu(),"function"==typeof bricksStickyHeader&&bricksStickyHeader(),"function"==typeof bricksOnePageNavigation&&bricksOnePageNavigation(),"function"==typeof bricksSkipLinks&&bricksSkipLinks(),"function"==typeof bricksFacebookSDK&&bricksFacebookSDK(),"function"==typeof bricksSearchToggle&&bricksSearchToggle(),"function"==typeof bricksPopups&&bricksPopups(),"function"==typeof bricksSwiper&&bricksSwiper(),"function"==typeof bricksSplide&&bricksSplide(),"function"==typeof bricksPhotoswipe&&bricksPhotoswipe(),"function"==typeof bricksPrettify&&bricksPrettify(),"function"==typeof bricksAccordion&&bricksAccordion(),"function"==typeof bricksAnimatedTyping&&bricksAnimatedTyping(),"function"==typeof bricksAudio&&bricksAudio(),"function"==typeof bricksCountdown&&bricksCountdown(),"function"==typeof bricksCounter&&bricksCounter(),"function"==typeof bricksTableOfContents&&bricksTableOfContents(),"function"==typeof bricksIsotope&&bricksIsotope(),"function"==typeof bricksPricingTables&&bricksPricingTables(),"function"==typeof bricksVideo&&bricksVideo(),"function"==typeof bricksLazyLoad&&bricksLazyLoad(),"function"==typeof bricksAnimation&&bricksAnimation(),"function"==typeof bricksPieChart&&bricksPieChart(),"function"==typeof bricksPostReadingProgressBar&&bricksPostReadingProgressBar(),"function"==typeof bricksProgressBar&&bricksProgressBar(),"function"==typeof bricksForm&&bricksForm(),"function"==typeof bricksInitQueryLoopInstances&&bricksInitQueryLoopInstances(),"function"==typeof bricksQueryPagination&&bricksQueryPagination(),"function"==typeof bricksInteractions&&bricksInteractions(),"function"==typeof bricksAlertDismiss&&bricksAlertDismiss(),"function"==typeof bricksTabs&&bricksTabs(),"function"==typeof bricksVideoOverlayClickDetector&&bricksVideoOverlayClickDetector(),"function"==typeof bricksBackgroundVideoInit&&bricksBackgroundVideoInit(),"function"==typeof bricksPostReadingTime&&bricksPostReadingTime(),"function"==typeof bricksNavNested&&bricksNavNested(),"function"==typeof bricksOffcanvas&&bricksOffcanvas(),"function"==typeof bricksNavNestedClose&&bricksNavNestedClose(),"function"==typeof bricksToggleDisplay&&bricksToggleDisplay(),"function"==typeof bricksToggle&&"function"==typeof bricksToggleDisplay&&bricksToggleDisplay()&&bricksToggle(),"function"==typeof bricksSubmenuListeners&&bricksSubmenuListeners(),"function"==typeof bricksSubmenuPosition&&bricksSubmenuPosition(250),"function"==typeof bricksAjaxLoader&&bricksAjaxLoader()}handleBricksforgeScripts(){if("undefined"!=typeof brfScrollVideoInstance&&brfScrollVideoInstance(),document.querySelector(".brf-three-js")&&this.handleThreeJs(),setTimeout((()=>{if(document.querySelector(".brxe-brf-pro-forms")&&"undefined"!=typeof BrfProForms){document.querySelectorAll(".brxe-brf-pro-forms").forEach((e=>{new BrfProForms(e),"undefined"!=typeof turnstile&&turnstile.render(e.querySelector(".cf-turnstile")),e.style.visibility="visible"}))}}),150),document.querySelector(".brf-flip-wrapper")&&brfFlipEverything(),document.querySelector("#brf-toc")&&brfToc(),"undefined"!=typeof MegaMenuSettings&&MegaMenuSettings.megaMenuActivated&&brfMegaMenu(),document.querySelector(".brf-before-and-after")&&brfBeforeAndAfter(),"undefined"!=typeof brfQuill&&brfQuill(),"undefined"!=typeof brfAnimatorInit&&(brfCurrentWindowWidth=window.innerWidth,brfAnimatorInit()),"undefined"!=typeof BRFSCROLLSMOOTHER&&(brfScrollSmoother=new BrfScrollSmoother),"undefined"!=typeof BrfPopups&&new BrfPopups,"undefined"!=typeof BricksforgePanel&&(brfPanel=new BricksforgePanel),document.querySelector("[data-rellax-speed]")){document.querySelectorAll("[data-rellax-speed]").forEach((function(e){var t=e.getAttribute("data-rellax-breakpoint");t&&window.innerWidth<=t||new Rellax(e)}))}}handleThreeJs(){let e=Date.now(),t=setInterval((()=>{if("undefined"!=typeof THREE&&void 0!==THREE.OrbitControls)clearInterval(t),brfThreeJsHandler();else if(Date.now()-e>2e3)return void clearInterval(t)}),100)}handleUserScripts(){if(this.settings.compatibilityCode)try{new Function(this.settings.compatibilityCode)()}catch(e){console.error("Error executing user scripts:",e)}}handleUserScriptsClick(e){if(this.settings.compatibilityCodeClick)try{new Function("event",this.settings.compatibilityCodeClick)(e)}catch(e){console.error("Error executing user scripts:",e)}}}document.addEventListener("DOMContentLoaded",(function(){(new BricksforgeTransitions).init()}));