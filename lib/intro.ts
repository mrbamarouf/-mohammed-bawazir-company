export const introKey = "mbt-intro-v2";
// Executes before paint. Storage errors leave the website immediately usable.
export const introBootstrap = `(function(){try{var h=document.documentElement;var home=/^\\/(ar|en)\\/?$/.test(location.pathname);if(home&&!sessionStorage.getItem('${introKey}')&&!sessionStorage.getItem('mbt-language-context')){h.dataset.intro='pending';setTimeout(function(){if(h.dataset.intro==='pending')delete h.dataset.intro},8000)}else{sessionStorage.setItem('${introKey}','seen')}}catch(e){}})();`;
