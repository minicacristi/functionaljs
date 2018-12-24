const CDN = s => `https://cdnjs.cloudflare.com/ajax/libs/${s}`;
const ramda = CDN('ramda/0.21.0/ramda.min');
const jquery = CDN('jquery/3.0.0-rc1/jquery.min');

requirejs.config({ paths: { ramda, jquery } });
requirejs(['jquery', 'ramda'], ($, { compose, curry, map, prop }) => {
  const Impure = {
    getJson: curry((callback, url) => $.getJSON(url, callback)),
    setHtml: curry((sel, html) => $(sel).html(html)),
    trace: curry((tag, x) => { console.log(tag, x); return x; })
  }
  const host = 'api.flickr.com';
  const path = '/services/feeds/photos_public.gne';
  const query = t => `?tags=${t}&format=json&jsoncallback=?`;
  const url = t => `https://${host}${path}${query(t)}`;
  const img = src => $('<img />', { src });

  // const mediaUrl = compose(prop('m'), prop('media'));
  // const mediaUrls = compose(map(mediaUrl), prop('items'));
  // const images = compose(map(img), compose(map(compose(prop('m'), prop('media'))), prop('items')));

  // const mediaUrl = compose(prop('m'), prop('media'));
  // const images = compose(map(img), map(mediaUrl), prop('items'));

  const mediaUrl = compose(prop('m'), prop('media'));
  const images = compose(compose(map(compose(img, mediaUrl)), prop('items')), Impure.trace('arguments'));

  const render = compose(Impure.setHtml('#js-main'), images)
  const app = compose(Impure.getJson(render), url);
  app('cats');
});