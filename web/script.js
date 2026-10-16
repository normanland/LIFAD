// =========================================================
// LIFAD — FROM RELEASE TO LEGACY
// =========================================================



// SECTION: Navigation

const navToggle =
  document.querySelector('.nav-toggle');

const navList =
  document.querySelector('.nav-list');

const navLinks =
  document.querySelectorAll('.nav-list a');


if (navToggle && navList) {

  navToggle.addEventListener(
    'click',
    () => {

      const isOpen =
        navList.classList.toggle('is-open');

      navToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

    }
  );

}


navLinks.forEach(
  (link) => {

    link.addEventListener(
      'click',
      () => {

        navList?.classList.remove(
          'is-open'
        );

        navToggle?.setAttribute(
          'aria-expanded',
          'false'
        );

      }
    );

  }
);


// current section

const sections =
  document.querySelectorAll(
    'main section[id]'
  );


const sectionObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach(
        (entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          navLinks.forEach(
            (link) =>
              link.classList.remove(
                'is-active'
              )
          );


          const current =
            document.querySelector(
              `.nav-list a[href="#${entry.target.id}"]`
            );


          current?.classList.add(
            'is-active'
          );

        }
      );

    },

    {
      threshold: 0.28,
      rootMargin:
        '0px 0px -55% 0px',
    }

  );


sections.forEach(
  (section) =>
    sectionObserver.observe(section)
);



// SECTION: Track data

const TRACK_DATA = [

  {
    id: 'track-01',
    order: 1,
    name: 'Rammlied',
    edition: 'Standard',
    duration: '05:19',
    bpm: 105,
    key: 'D minor',

    liveDebut: '2009-10-27',
    lastPerformed: '2023-08-05',
    liveCount: 148,

    lastfmListeners: 270944,
    lastfmPlaycount: 2637181,
    scrobblesPerListener: 9.73,

    spotifyStreams: 75208799,
    dailyStreams: 16645,

    storyType: 'Production',

    story:
      'Before release, Rammlied circulated under the working title "Ramm-Mix". The track also received a Thrash-terpiece Remix by Machine Head frontman Robb Flynn, originally associated with the album\'s digital release campaign.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Rammlied_(song)',
  },


  {
    id: 'track-02',
    order: 2,
    name: 'Ich tu dir weh',
    edition: 'Standard',
    duration: '05:02',
    bpm: 110,
    key: 'D minor',

    liveDebut: '2009-10-27',
    lastPerformed: '2017-07-13',
    liveCount: 178,

    lastfmListeners: 347731,
    lastfmPlaycount: 3771383,
    scrobblesPerListener: 10.85,

    spotifyStreams: 140581885,
    dailyStreams: 31132,

    storyType: 'Controversy',

    story:
      'Ich tu dir weh became one of the most controversial tracks of the LIFAD era. The song was indexed in Germany in 2009 because of its lyrical content and was later removed from the index. During the restriction period, parts of the lyrics were modified in some German live performances.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Ich_tu_dir_weh_(song)',
  },


  {
    id: 'track-03',
    order: 3,
    name: 'Waidmanns Heil',
    edition: 'Standard',
    duration: '03:33',
    bpm: 105,
    key: 'D minor',

    liveDebut: '2009-10-27',
    lastPerformed: '2011-05-31',
    liveCount: 117,

    lastfmListeners: 317595,
    lastfmPlaycount: 3396486,
    scrobblesPerListener: 10.69,

    spotifyStreams: 120653465,
    dailyStreams: 25152,

    storyType: 'Origins',

    story:
      'The lyrics of Waidmanns Heil draw from a reworked version of "Sautod", a poem published by Till Lindemann in Messer. The song later also appeared in Guitar Hero: Warriors of Rock.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Waidmanns_Heil_(song)',
  },


  {
    id: 'track-04',
    order: 4,
    name: 'Haifisch',
    edition: 'Standard',
    duration: '03:45',
    bpm: 135,
    key: 'E minor',

    liveDebut: '2009-10-27',
    lastPerformed: '2012-05-25',
    liveCount: 181,

    lastfmListeners: 318203,
    lastfmPlaycount: 3387590,
    scrobblesPerListener: 10.65,

    spotifyStreams: 102998020,
    dailyStreams: 19492,

    storyType: 'Video',

    story:
      'Haifisch received one of the era\'s most self-referential videos. The video presents the other members of Rammstein attending a fictional funeral for Till Lindemann and references imagery from earlier points in the band\'s visual history.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Haifisch_(video)',
  },


  {
    id: 'track-05',
    order: 5,
    name: 'B********',
    edition: 'Standard',
    duration: '04:13',
    bpm: 94,
    key: 'D',

    liveDebut: '2009-10-27',
    lastPerformed: '2011-05-31',
    liveCount: 110,

    lastfmListeners: 189481,
    lastfmPlaycount: 1609959,
    scrobblesPerListener: 8.50,

    spotifyStreams: 23407374,
    dailyStreams: 5163,

    storyType: 'Lyrics',

    story:
      'Parts of the song\'s lyrics are connected to Till Lindemann\'s poem "Nele". The word "Bückstabü" is itself a constructed term rather than a standard German word and plays with several linguistic associations.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/B%2A%2A%2A%2A%2A%2A%2A%2A_(song)',
  },


  {
    id: 'track-06',
    order: 6,
    name: 'Frühling in Paris',
    edition: 'Standard',
    duration: '04:45',
    bpm: 64,
    key: 'F-sharp minor',

    liveDebut: '2009-10-27',
    lastPerformed: '2017-07-13',
    liveCount: 116,

    lastfmListeners: 175592,
    lastfmPlaycount: 1703375,
    scrobblesPerListener: 9.70,

    spotifyStreams: 34726953,
    dailyStreams: 8119,

    storyType: 'Musical reference',

    story:
      'Frühling in Paris contains a clear French musical reference through its connection to Édith Piaf\'s "Non, je ne regrette rien". During development, the track also carried the working title "Paris, oh non!".',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Fr%C3%BChling_in_Paris_(song)',
  },


  {
    id: 'track-07',
    order: 7,
    name: 'Wiener Blut',
    edition: 'Standard',
    duration: '03:52',
    bpm: 110,
    key: 'E minor',

    liveDebut: '2009-10-27',
    lastPerformed: '2024-07-31',
    liveCount: 180,

    lastfmListeners: 204105,
    lastfmPlaycount: 1751061,
    scrobblesPerListener: 8.58,

    spotifyStreams: 25501330,
    dailyStreams: 3651,

    storyType: 'Historical context',

    story:
      'Wiener Blut is connected to the Josef Fritzl case, which became public in Austria in 2008. Material related to the subject also appeared during the development of other songs from the LIFAD sessions.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Wiener_Blut_(song)',
  },


  {
    id: 'track-08',
    order: 8,
    name: 'Pussy',
    edition: 'Standard',
    duration: '03:59',
    bpm: 135,
    key: 'D minor',

    liveDebut: '2009-10-27',
    lastPerformed: '2024-07-31',
    liveCount: 336,

    lastfmListeners: 380274,
    lastfmPlaycount: 4310783,
    scrobblesPerListener: 11.34,

    spotifyStreams: 106049284,
    dailyStreams: 18121,

    storyType: 'Development',

    story:
      'Pussy went through several substantially different demo forms. Early material included an English-language demo known as "Panterra Pussy", while musical and lyrical ideas from the development process later appeared elsewhere in the band\'s catalogue.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Pussy_(song)',
  },


  {
    id: 'track-09',
    order: 9,
    name: 'Liebe ist für alle da',
    edition: 'Standard',
    duration: '03:28',
    bpm: 180,
    key: 'D minor',

    liveDebut: '2009-10-27',
    lastPerformed: '2010-03-04',
    liveCount: 53,

    lastfmListeners: 163478,
    lastfmPlaycount: 1460791,
    scrobblesPerListener: 8.94,

    spotifyStreams: 22550422,
    dailyStreams: 4336,

    storyType: 'Live detail',

    story:
      'The title track follows Pussy in the album sequence with a musical transition between the recordings. During live performances, the final line was also altered, giving the song a slightly different concert ending.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Liebe_ist_f%C3%BCr_alle_da_(song)',
  },


  {
    id: 'track-10',
    order: 10,
    name: 'Mehr',
    edition: 'Standard',
    duration: '04:11',
    bpm: 100,
    key: 'D',

    liveDebut: null,
    lastPerformed: null,
    liveCount: null,

    lastfmListeners: 190766,
    lastfmPlaycount: 1547598,
    scrobblesPerListener: 8.11,

    spotifyStreams: 16799428,
    dailyStreams: 3555,

    storyType: 'Studio archive',

    story:
      'Mehr has a visible record of its studio development. Footage published during the recording period showed Christoph Schneider recording drums for an earlier version, and documented beta material differs from the final album arrangement.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Mehr_(song)',
  },


  {
    id: 'track-11',
    order: 11,
    name: 'Roter Sand',
    edition: 'Standard',
    duration: '03:59',
    bpm: 56,
    key: 'E minor',

    liveDebut: null,
    lastPerformed: null,
    liveCount: null,

    lastfmListeners: 186955,
    lastfmPlaycount: 1434743,
    scrobblesPerListener: 7.67,

    spotifyStreams: 14750579,
    dailyStreams: 2864,

    storyType: 'Origins',

    story:
      'According to Paul Landers, material that became Roter Sand began with Liese, created by Olli, Till and Flake before the remaining members contributed to its later development. The characteristic whistling was performed by Jenny Rosemeyer.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Roter_Sand_(song)',
  },


  {
    id: 'track-12',
    order: 12,
    name: 'Führe mich',
    edition: 'Special Edition',
    duration: '04:33',
    bpm: 78,
    key: 'D minor',

    liveDebut: null,
    lastPerformed: null,
    liveCount: null,

    lastfmListeners: 124972,
    lastfmPlaycount: 1041442,
    scrobblesPerListener: 8.33,

    spotifyStreams: 25564873,
    dailyStreams: 7933,

    storyType: 'Film connection',

    story:
      'Führe mich later gained a life outside the LIFAD special edition through its connection with Lars von Trier\'s Nymphomaniac. A modified and shorter version of the song was used in connection with the film soundtrack.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/F%C3%BChre_mich_(song)',
  },


  {
    id: 'track-13',
    order: 13,
    name: 'Donaukinder',
    edition: 'Special Edition',
    duration: '05:17',
    bpm: 60,
    key: 'D minor',

    liveDebut: null,
    lastPerformed: null,
    liveCount: null,

    lastfmListeners: 140357,
    lastfmPlaycount: 1277753,
    scrobblesPerListener: 9.10,

    spotifyStreams: 28411732,
    dailyStreams: 12297,

    storyType: 'Interpretation',

    story:
      'Donaukinder is frequently interpreted as referring to the 2000 Baia Mare cyanide spill and its environmental impact on the Danube river system. This interpretation is not presented as an officially confirmed explanation by the band.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Donaukinder_(song)',
  },


  {
    id: 'track-14',
    order: 14,
    name: 'Halt',
    edition: 'Special Edition',
    duration: '04:21',
    bpm: 80,
    key: 'D minor',

    liveDebut: null,
    lastPerformed: null,
    liveCount: null,

    lastfmListeners: 116950,
    lastfmPlaycount: 930026,
    scrobblesPerListener: 7.95,

    spotifyStreams: 16991194,
    dailyStreams: 3276,

    storyType: 'Production',

    story:
      'An earlier beta of Halt documents how the arrangement changed during production. The beta contains differences in its intro, guitar and synthesizer layers, second verse and bridge when compared with the final release.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Halt_(song)',
  },


  {
    id: 'track-15',
    order: 15,
    name: 'Roter Sand (Orchester Version)',
    edition: 'Special Edition',
    duration: '04:07',
    bpm: 56,
    key: 'E minor',

    liveDebut: null,
    lastPerformed: null,
    liveCount: null,

    lastfmListeners: 31181,
    lastfmPlaycount: 204127,
    scrobblesPerListener: 6.55,

    spotifyStreams: 8122161,
    dailyStreams: 986,

    storyType: 'Alternate version',

    story:
      'The orchestral version preserves the core Roter Sand composition while reframing it through different instrumentation. Documented differences also include an alternate vocal take, making the recording more than a simple duplicate of the standard version.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Roter_Sand_(song)',
  },


  {
    id: 'track-16',
    order: 16,
    name: 'Liese',
    edition: 'Special Edition',
    duration: '03:55',
    bpm: 56,
    key: 'E minor',

    liveDebut: null,
    lastPerformed: null,
    liveCount: null,

    lastfmListeners: 99025,
    lastfmPlaycount: 630384,
    scrobblesPerListener: 6.37,

    spotifyStreams: 9587454,
    dailyStreams: 1421,

    storyType: 'Origins',

    story:
      'Liese is closely connected to Roter Sand. According to Paul Landers, Olli, Till and Flake created the original material before the other members became involved in transforming it into Roter Sand. Jenny Rosemeyer performed the whistling heard on the recording.',

    storySource:
      'RammWiki',

    storyUrl:
      'https://ramm.wiki/Liese_(song)',
  },

];



// SECTION: Charts

const CHART_DATA = [

  {
    country: 'Germany',
    peak: 1,
    weeks: 83,
  },

  {
    country: 'Austria',
    peak: 1,
    weeks: 47,
  },

  {
    country: 'Switzerland',
    peak: 1,
    weeks: 37,
  },

  {
    country: 'France',
    peak: 2,
    weeks: 21,
  },

  {
    country: 'Netherlands',
    peak: 1,
    weeks: 29,
  },

  {
    country: 'Belgium · Flanders',
    peak: 3,
    weeks: 50,
  },

  {
    country: 'Belgium · Wallonia',
    peak: 4,
    weeks: 25,
  },

  {
    country: 'Sweden',
    peak: 3,
    weeks: 13,
  },

  {
    country: 'Finland',
    peak: 1,
    weeks: 44,
  },

  {
    country: 'Norway',
    peak: 4,
    weeks: 8,
  },

  {
    country: 'Denmark',
    peak: 1,
    weeks: 17,
  },

  {
    country: 'Italy',
    peak: 14,
    weeks: 6,
  },

  {
    country: 'Spain',
    peak: 5,
    weeks: 11,
  },

  {
    country: 'Portugal',
    peak: 4,
    weeks: 5,
  },

  {
    country: 'Australia',
    peak: 9,
    weeks: 2,
  },

  {
    country: 'New Zealand',
    peak: 15,
    weeks: 4,
  },

  {
    country: 'United Kingdom',
    peak: 16,
    weeks: 3,
  },

  {
    country: 'United States',
    peak: 13,
    weeks: null,
  },

];



// SECTION: Certifications

const CERTIFICATION_DATA = [

  {
    market: 'Austria',
    certification: 'Platinum',
    multiplier: 1,
    units: 20000,
  },

  {
    market: 'Belgium',
    certification: 'Gold',
    multiplier: 1,
    units: 15000,
  },

  {
    market: 'Denmark',
    certification: 'Gold',
    multiplier: 1,
    units: 15000,
  },

  {
    market: 'Finland',
    certification: 'Platinum',
    multiplier: 1,
    units: 24843,
  },

  {
    market: 'France',
    certification: 'Gold',
    multiplier: 1,
    units: 50000,
  },

  {
    market: 'Germany',
    certification: 'Gold',
    multiplier: 7,
    units: 700000,
  },

  {
    market: 'Poland',
    certification: 'Gold',
    multiplier: 1,
    units: 10000,
  },

  {
    market: 'Romania',
    certification: 'Platinum',
    multiplier: 4,
    units: null,
  },

  {
    market: 'Russia',
    certification: 'Platinum',
    multiplier: 2,
    units: 40000,
  },

  {
    market: 'Sweden',
    certification: 'Gold',
    multiplier: 1,
    units: 20000,
  },

  {
    market: 'Switzerland',
    certification: 'Platinum',
    multiplier: 1,
    units: 30000,
  },

  {
    market: 'United Kingdom',
    certification: 'Silver',
    multiplier: 1,
    units: 60000,
  },

  {
    market: 'Europe',
    certification: 'Platinum',
    multiplier: 1,
    units: 1000000,
  },

];



// SECTION: Formatting

const compactNumber =
  new Intl.NumberFormat(
    'en',
    {
      notation: 'compact',
      maximumFractionDigits: 1,
    }
  );


const fullNumber =
  new Intl.NumberFormat('en');


function compact(value) {

  if (
    value === null
    || value === undefined
  ) {
    return '—';
  }

  return compactNumber.format(value);
}


function full(value) {

  if (
    value === null
    || value === undefined
  ) {
    return '—';
  }

  return fullNumber.format(value);
}


function formatDate(value) {

  if (!value) {
    return '—';
  }


  return new Date(
    `${value}T00:00:00`
  ).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );

}



// SECTION: Album overview

function renderAlbum() {

  const standard =
    document.getElementById(
      'standardTrackList'
    );

  const bonus =
    document.getElementById(
      'bonusTrackList'
    );


  TRACK_DATA.forEach(
    (track) => {

      const item =
        document.createElement('li');

      item.textContent =
        `${track.name} · ${track.duration}`;


      if (
        track.edition === 'Standard'
      ) {

        standard?.appendChild(item);

      }

      else {

        bonus?.appendChild(item);

      }

    }
  );

}



// SECTION: Charts

function renderCharts() {

  const body =
    document.getElementById(
      'chartTableBody'
    );


  const sorted =
    [...CHART_DATA].sort(
      (a, b) =>
        a.peak - b.peak
    );


  sorted.forEach(
    (item) => {

      const row =
        document.createElement('tr');


      row.innerHTML = `
        <td>${item.country}</td>
        <td>#${item.peak}</td>
        <td>
          ${
            item.weeks === null
              ? '—'
              : item.weeks
          }
        </td>
      `;


      body?.appendChild(row);

    }
  );


  document.getElementById(
    'chartMarketCount'
  ).textContent =
    CHART_DATA.length;


  document.getElementById(
    'numberOneMarkets'
  ).textContent =
    CHART_DATA.filter(
      item => item.peak === 1
    ).length;


  document.getElementById(
    'topTenMarkets'
  ).textContent =
    CHART_DATA.filter(
      item => item.peak <= 10
    ).length;


  renderChartVisual();

}



function renderChartVisual() {

  const visual =
    document.getElementById(
      'chartVisual'
    );


  const strongest =
    [...CHART_DATA]
      .sort(
        (a, b) =>
          a.peak - b.peak
      )
      .slice(0, 10);


  strongest.forEach(
    (item) => {

      const row =
        document.createElement('div');

      row.className =
        'chart-row';


      const width =
        Math.max(
          15,
          100 -
          ((item.peak - 1) * 6)
        );


      row.innerHTML = `
        <span class="chart-name">
          ${item.country}
        </span>

        <div class="chart-bar-track">

          <div
            class="chart-bar"
            style="width:${width}%"
          ></div>

        </div>

        <strong class="chart-peak">
          #${item.peak}
        </strong>
      `;


      visual?.appendChild(row);

    }
  );

}



// SECTION: Certifications

function certificationLabel(item) {

  if (item.multiplier > 1) {

    return (
      `${item.multiplier}× ` +
      item.certification
    );

  }

  return item.certification;
}


function renderCertifications() {

  const body =
    document.getElementById(
      'certificationTableBody'
    );


  CERTIFICATION_DATA.forEach(
    (item) => {

      const row =
        document.createElement('tr');


      row.innerHTML = `
        <td>${item.market}</td>

        <td>
          ${certificationLabel(item)}
        </td>

        <td>
          ${
            item.units === null
              ? '—'
              : full(item.units)
          }
        </td>
      `;


      body?.appendChild(row);

    }
  );


  document.getElementById(
    'certifiedMarketCount'
  ).textContent =
    CERTIFICATION_DATA.length;


  const highest =
    [...CERTIFICATION_DATA]
      .sort(
        (a, b) =>
          b.multiplier -
          a.multiplier
      )[0];


  document.getElementById(
    'highestCertification'
  ).textContent =
    `${highest.market} · ` +
    `${highest.multiplier}×`;


  document.getElementById(
    'totalCertifiedUnits'
  ).textContent =
    'Not aggregated';

}



// SECTION: Digital summary

function renderDigital() {

  const totalSpotify =
    TRACK_DATA.reduce(
      (sum, track) =>
        sum + track.spotifyStreams,
      0
    );


  const totalDaily =
    TRACK_DATA.reduce(
      (sum, track) =>
        sum + track.dailyStreams,
      0
    );


  const totalLastfm =
    TRACK_DATA.reduce(
      (sum, track) =>
        sum + track.lastfmPlaycount,
      0
    );


  document.getElementById(
    'albumSpotifyStreams'
  ).textContent =
    compact(totalSpotify);


  document.getElementById(
    'albumDailyStreams'
  ).textContent =
    `${compact(totalDaily)} / day`;


  document.getElementById(
    'albumLastfmScrobbles'
  ).textContent =
    compact(totalLastfm);


  const topSpotify =
    [...TRACK_DATA]
      .sort(
        (a, b) =>
          b.spotifyStreams -
          a.spotifyStreams
      )[0];


  const topDaily =
    [...TRACK_DATA]
      .sort(
        (a, b) =>
          b.dailyStreams -
          a.dailyStreams
      )[0];


  const topEngagement =
    [...TRACK_DATA]
      .sort(
        (a, b) =>
          b.scrobblesPerListener -
          a.scrobblesPerListener
      )[0];


  document.getElementById(
    'topSpotifyTrack'
  ).textContent =
    `${topSpotify.name} · ` +
    compact(
      topSpotify.spotifyStreams
    );


  document.getElementById(
    'topDailyTrack'
  ).textContent =
    `${topDaily.name} · ` +
    `${compact(topDaily.dailyStreams)} / day`;


  document.getElementById(
    'topEngagementTrack'
  ).textContent =
    `${topEngagement.name} · ` +
    topEngagement
      .scrobblesPerListener
      .toFixed(2);


  document.getElementById(
    'topSpotifyBar'
  ).style.width =
    `${
      (
        topSpotify.spotifyStreams /
        totalSpotify
      ) * 100
    }%`;


  document.getElementById(
    'topDailyBar'
  ).style.width =
    `${
      (
        topDaily.dailyStreams /
        totalDaily
      ) * 100
    }%`;


  document.getElementById(
    'topEngagementBar'
  ).style.width =
    `${
      Math.min(
        (
          topEngagement.scrobblesPerListener /
          12
        ) * 100,
        100
      )
    }%`;

}



// SECTION: Live legacy

function renderLive() {

  const liveTracks =
    TRACK_DATA
      .filter(
        track =>
          track.liveCount !== null
      )
      .sort(
        (a, b) =>
          b.liveCount -
          a.liveCount
      );


  const body =
    document.getElementById(
      'liveTableBody'
    );


  liveTracks.forEach(
    (track) => {

      const row =
        document.createElement('tr');


      row.innerHTML = `
        <td>${track.name}</td>

        <td>
          ${full(track.liveCount)}
        </td>

        <td>
          ${formatDate(track.lastPerformed)}
        </td>
      `;


      body?.appendChild(row);

    }
  );


  document.getElementById(
    'performedTrackCount'
  ).textContent =
    `${liveTracks.length} / ${TRACK_DATA.length}`;


  document.getElementById(
    'highestLiveCount'
  ).textContent =
    full(
      liveTracks[0].liveCount
    );


  document.getElementById(
    'mostPerformedTrack'
  ).textContent =
    liveTracks[0].name;

}



// SECTION: Track explorer

const trackList =
  document.getElementById(
    'trackList'
  );


function renderTrackButtons() {

  TRACK_DATA.forEach(
    (track) => {

      const li =
        document.createElement('li');


      const button =
        document.createElement('button');


      const number =
        String(track.order)
          .padStart(2, '0');


      button.innerHTML = `
        <span class="track-button-number">
          ${number}
        </span>

        <span>
          ${track.name}
        </span>
      `;


      button.dataset.trackId =
        track.id;


      button.addEventListener(
        'click',
        () =>
          selectTrack(track.id)
      );


      li.appendChild(button);

      trackList?.appendChild(li);

    }
  );


  selectTrack(
    TRACK_DATA[0].id
  );

}



// SECTION: Select track

function selectTrack(trackId) {

  const track =
    TRACK_DATA.find(
      item =>
        item.id === trackId
    );


  if (!track) {
    return;
  }


  document
    .querySelectorAll(
      '#trackList button'
    )
    .forEach(
      (button) => {

        button.classList.toggle(
          'is-active',
          button.dataset.trackId
            === trackId
        );

      }
    );


  document.getElementById(
    'trackName'
  ).textContent =
    track.name;


  document.getElementById(
    'trackNumber'
  ).textContent =
    String(track.order)
      .padStart(2, '0');


  document.getElementById(
    'trackSubtitle'
  ).textContent =
    `${track.edition} · ` +
    `${track.duration} · ` +
    `${track.key}`;


  document.getElementById(
    'trackSpotify'
  ).textContent =
    compact(
      track.spotifyStreams
    );


  document.getElementById(
    'trackDaily'
  ).textContent =
    `${compact(track.dailyStreams)} / day`;


  document.getElementById(
    'trackLive'
  ).textContent =
    track.liveCount === null
      ? 'Not documented'
      : full(track.liveCount);


  document.getElementById(
    'trackListeners'
  ).textContent =
    compact(
      track.lastfmListeners
    );


  document.getElementById(
    'trackEngagement'
  ).textContent =
    track
      .scrobblesPerListener
      .toFixed(2);


  document.getElementById(
    'trackBpm'
  ).textContent =
    `${track.bpm} BPM`;


  renderTrackProfile(track);

  renderTrackStory(track);

}



// SECTION: Track profile

function renderTrackProfile(track) {

  const context =
    document.getElementById(
      'trackContext'
    );


  const music =
    `${track.name} runs for ` +
    `${track.duration}, is set in ` +
    `${track.key}, and has a tempo ` +
    `of ${track.bpm} BPM.`;


  const digital =
    ` Its current digital footprint includes ` +
    `${compact(track.spotifyStreams)} Spotify streams, ` +
    `${compact(track.dailyStreams)} current daily streams ` +
    `and ${compact(track.lastfmListeners)} Last.fm listeners.`;


  let live;


  if (track.liveCount === null) {

    live =
      ' No documented live-performance count is available in the current dataset.';

  }

  else {

    live =
      ` ${track.liveCount} documented live performances are recorded`;


    if (track.lastPerformed) {

      live +=
        `, with the latest documented performance on ` +
        `${formatDate(track.lastPerformed)}`;

    }


    live += '.';

  }


  context.textContent =
    music + digital + live;

}



// SECTION: Track story

function renderTrackStory(track) {

  const story =
    document.getElementById(
      'trackStory'
    );


  const storyType =
    document.getElementById(
      'trackStoryType'
    );


  const source =
    document.getElementById(
      'trackStorySource'
    );


  const sourceName =
    document.getElementById(
      'trackStorySourceName'
    );


  const container =
    story?.closest(
      '.track-story'
    );


  container?.classList.add(
    'is-updating'
  );


  window.setTimeout(
    () => {

      story.textContent =
        track.story;


      storyType.textContent =
        track.storyType;


      source.href =
        track.storyUrl;


      sourceName.textContent =
        track.storySource;


      container?.classList.remove(
        'is-updating'
      );

    },

    100
  );

}



// SECTION: Initial render

renderAlbum();

renderCharts();

renderCertifications();

renderDigital();

renderLive();

renderTrackButtons();