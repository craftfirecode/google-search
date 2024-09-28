import React, { useState } from 'react';
import { Input } from './components/ui/input';


const App: React.FC = () => {

  const [exactPhrase, setExactPhrase] = useState<string>('');
  const [site, setSite] = useState<string>('');
  const [inurl, setInurl] = useState<string>('');
  const [intitle, setIntitle] = useState<string>('');
  const [intext, setIntext] = useState<string>('');
  const [filetype, setFiletype] = useState<string>('');
  const [related, setRelated] = useState<string>('');
  const [excludeWords, setExcludeWords] = useState<string>('');
  const [orWords, setOrWords] = useState<string>('');
  const [wildcardPhrase, setWildcardPhrase] = useState<string>('');
  const [defineWord, setDefineWord] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [allintitle, setAllintitle] = useState<string>('');
  const [allinurl, setAllinurl] = useState<string>('');
  const [allintext, setAllintext] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');

  const handleSearch = () => {
    let query = '';

    if (exactPhrase) query += `"${exactPhrase}" `;
    if (site) query += `site:${site} `;
    if (inurl) query += `inurl:${inurl} `;
    if (intitle) query += `intitle:${intitle} `;
    if (intext) query += `intext:${intext} `;
    if (filetype) query += `filetype:${filetype} `;
    if (related) query += `related:${related} `;
    if (excludeWords) {
      const words = excludeWords.split(' ');
      words.forEach((word) => {
        query += `-${word} `;
      });
    }
    if (orWords) {
      const words = orWords.split(' ');
      query += words.join(' OR ') + ' ';
    }
    if (wildcardPhrase) query += `${wildcardPhrase} `;
    if (defineWord) query += `define:${defineWord} `;
    if (location) query += `location:${location} `;
    if (allintitle) query += `allintitle:${allintitle} `;
    if (allinurl) query += `allinurl:${allinurl} `;
    if (allintext) query += `allintext:${allintext} `;

    query += keywords;

    const url = `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`;

  
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      // In der Chrome-Erweiterungsumgebung
      chrome.tabs.create({ url });
    } else {
      // Außerhalb der Chrome-Erweiterungsumgebung (z.B. beim Testen)
      window.open(url, '_blank');
    }
  };

  return (
    <div className="w-[600px] p-5 rounded">
      <h1 className="my-2 text-[22px]">Google Operatoren Suche</h1>
      {/* Eingabefelder für alle Operatoren */}
      <div className='flex flex-col gap-3'>
      <Input
        type="text"
        placeholder="Website oder Domain (site:)"
        value={site}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSite(e.target.value)}
      />
      <Input
        type="text"
        placeholder='Exakte Phrase (z.B. "Katzenvideos")'
        value={exactPhrase}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExactPhrase(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Beliebige dieser Wörter (OR)"
        value={orWords}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrWords(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Keine dieser Wörter (-)"
        value={excludeWords}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExcludeWords(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Im Titel (intitle:)"
        value={intitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIntitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="In URL (inurl:)"
        value={inurl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInurl(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Im Text (intext:)"
        value={intext}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIntext(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Dateityp (filetype:)"
        value={filetype}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiletype(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Ähnliche Seiten (related:)"
        value={related}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRelated(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Platzhalterphrase (*)"
        value={wildcardPhrase}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWildcardPhrase(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Definition von (define:)"
        value={defineWord}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDefineWord(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Ort oder Sprache (location:)"
        value={location}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Alle Wörter im Titel (allintitle:)"
        value={allintitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllintitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Alle Wörter in URL (allinurl:)"
        value={allinurl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllinurl(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Alle Wörter im Text (allintext:)"
        value={allintext}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAllintext(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Zusätzliche Schlüsselwörter"
        value={keywords}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeywords(e.target.value)}
      />
      </div>
    
      <button className="bg-black text-white px-5 py-1 rounded shadow mt-3" onClick={handleSearch}>Suchen</button>
    </div>
  );
};

export default App;
