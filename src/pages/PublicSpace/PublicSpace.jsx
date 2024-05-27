import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PublicSpace.css';
import Filter from 'bad-words';

function PublicSpace() {
  const [content, setContent] = useState({
    text: '',
    image: null,
    video: null,
    audio: null,
    pdf: null,
  });

  const [sharedContent, setSharedContent] = useState([]);

  const filter = new Filter();
  filter.addWords('fuck', 'fucked', 'fucker', 'fucking', 'fuckwit', 'fucknut', 'fuckface', 'fuckhead', 'fuckhole',
  'shit', 'shitty', 'shitface', 'shithead', 'shithole', 'shitbag', 'shitcunt', 'shitsack',
  'bitch', 'bitchy', 'bitcher', 'bitchass', 'bitchtits',
  'cunt', 'cuntface', 'cuntlick', 'cuntlicker', 'cuntrag', 'cuntbag',
  'asshole', 'assmunch', 'assmuncher', 'asshat', 'asswipe', 'asswipe', 'assbag', 'assbandit', 'assbanger',
  'bastard', 'bastarding', 'bastardly',
  'piss', 'pissed', 'pisser', 'pissing', 'pissflaps',
  'damn', 'damned', 'damnation', 'dammit',
  'whore', 'whoreson', 'whoreface', 'whoreish', 'whorehouse',
  'slut', 'slutty', 'slutbag', 'slutface', 'slutish',
  'twat', 'twatface', 'twathead', 'twatlips', 'twatmonger',
  'fag', 'faggot', 'faggy', 'faggotry', 'faggotish',
  'dyke', 'dyked', 'dykeface', 'dykeish',
  'pussy', 'pussycat', 'pussyfart', 'pussyfurter',
  'dick', 'dickhead', 'dickface', 'dickwad', 'dickweed', 'dickbag', 'dickhole',
  'cock', 'cocksucker', 'cocksuck', 'cockface', 'cockhead', 'cockbag', 'cockfucker',
  'wanker', 'wanking', 'wankstain', 'wankjob',
  'motherfucker', 'motherfucking', 'motherfuckings', 'motherfuckka',
  'scumbag', 'scumbutt', 'scumbreath', 'scumdick',
  'jerk', 'jerkass', 'jerkoff', 'jerkwad',
  'douche', 'douchebag', 'douchenozzle', 'douchecanoe',
  'dipshit', 'dipstick',
  'shithead', 'shitstain', 'shitbreath', 'shitcanned',
  'bullshit', 'bullshitter', 'bullshitting',
  'bollocks', 'bollocksed', 'bollockbrain',
  'bugger', 'buggered', 'buggering',
  'wanker', 'wankstain',
  'tosser', 'tosspot', 'tossturd',
  'turd', 'turdface', 'turdball', 'turdnugget',
  'dumbass', 'dumbshit', 'dumbfuck',
  'retard', 'retarded',
  'idiot', 'idiotic',
  'moron', 'moronic',
  'imbecile', 'imbecilic',
  'cretin', 'cretinous',
  'spastic',
  'nigger', 'nigga', 'niglet',
  'chink', 'chinky', 'chinkstink',
  'gook', 'gookstink',
  'kike', 'kikes',
  'wetback',
  'spic', 'spick', 'spickstink',
  'kraut', 'krauthead',
  'honky', 'honkey', 'honkeytonk',
  'cracker', 'crackerass',
  'redneck', 'redneckin',
  'hillbilly',
  'trailer trash', 'trashbag','chutiya', 'harami', 'kutta', 'saala', 'bhenchod', 'madarchod', 'gaandu', 'raand',
  'randi', 'bhosdi', 'bhosad', 'bhadva', 'bhadva', 'lavda', 'lund', 'tatte', 'gosht',
  'maachud', 'maadarchod', 'maaki', 'makichut', 'bhadvagiri', 'chutmarike', 'gandmaraiki',
  'gandua', 'gaandfat', 'gandpaidaish', 'gashti', 'ghasti', 'ghassa', 'bahenchod', 'bahenchod',
  'bahnchod', 'bhandve', 'potahchod', 'babuchod', 'babuchod', 'bhoskichod', 'bhosrichod',
  'bhosdichod', 'bhosdichoad', 'bhosdike', 'bhosdike', 'chod', 'chodu', 'chodra', 'chodra',
  'chudail', 'chutad', 'chutiyapa', 'chutiyapanti', 'chuttad', 'chuttar', 'gaandu', 'gaandugarmi',
  'gaanduon', 'gaandmasti', 'gaandupana', 'gaandu', 'gaandufauj', 'gaandumaar', 'gaandumasti',
  'gaandupomu', 'gaandurashtra', 'gaandutapri', 'gaanduwala', 'gaanduwalapana', 'gaanduyabaj',
  'gaanduzaamin', 'ghashier', 'ghasti', 'ghasti', 'ghasti', 'gandpahunch', 'gashti', 'ghashier',
  'gandpahu', 'pundai', 'punnai', 'kundi', 'kundiramani', 'poonai', 'pundaimavan', 'thookbu',
  'ookla', 'tedtalk', 'kekhusra', 'keera', 'kehndi', 'khhusra', 'khusra', 'kunji', 'kunni',
  'kunnilingus', 'kunnipleaser', 'kunniyal', 'kunnri', 'kunth', 'kunthmulla', 'kuntri', 'kuththa',
  'kuthri', 'kuththamozhi', 'kuththi', 'kuththiyaikku', 'kuththri', 'kuthi', 'kuthmulla', 'kuththa',
  'kuthri', 'laikkaran', 'laikku', 'laippu', 'larikkaran', 'leppu', 'lepra', 'levanu', 'lingam',
  'lingamudayam', 'lingamudisudhu', 'lingapuri', 'lingari', 'lingavidai', 'lingudu', 'lippu',
  'llaikku', 'llaippu', 'lolikku', 'lolikkunna', 'lolippu', 'lorishtu', 'lundi', 'lundipottu',
  'lundithangi', 'lundpagal', 'maadhaari', 'maadhiri', 'maaka', 'maakaa', 'maakalaani', 'maavadipillai',
  'maayiru', 'maippu', 'majavaathi', 'mallundhi', 'mandhiri', 'mandiri', 'marumagan', 'marumahu',
  'marumakkalai', 'mathukkulandavanan', 'maths', 'mattukkulandaivanaN', 'mattukkulee', 'mattukkuliyanavan',
  'meevidiya', 'mellammavadiyar', 'melunnadiyan', 'mendhikkaran', 'methukkulandaivanaN', 'methuna',
  'modakku', 'moddhu', 'modhakku', 'monaiotrr', 'moonjal', 'moosu', 'mootu', 'mothaiotrrudu',
  'mothiraikkaran', 'motrr', 'moul', 'mounam', 'mounathingal', 'mousam', 'mugilu', 'mulaigaarundu',
  'mulaikkaaru', 'mullaikaarundu', 'mullatthadi', 'mullear', 'multhapidi', 'muluthadi', 'muthath',
  'muthaiotrr', 'muthaikku', 'muthaiottrudu', 'muthaikudiyan', 'muthaiyan', 'muthaiyedu', 'muthaiyoan',
  'muthaiyr', 'muthakka', 'muthalai', 'muthaliyan', 'muthdha', 'muthokkaran', 'muthudu', 'muthukai',
  'muthulam', 'muthunna', 'muttaiyan', 'mutthaiotrr', 'myru', 'naachu', 'naakku', 'naaku', 'naakundu',
  'naangan', 'naangithai', 'naaramoorthy');

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' || name === 'video' || name === 'audio' || name === 'pdf') {
      setContent((prevContent) => ({
        ...prevContent,
        [name]: files[0],
      }));
    } else {
      setContent((prevContent) => ({
        ...prevContent,
        [name]: value,
      }));
    }
  };

  const checkForOffensiveContent = (content) => {
    const { text } = content;
    if (text) {
      const cleanedText = filter.clean(text);
      if (cleanedText !== text) {
        alert('Your content contains offensive language, and it has been removed.');
      }
      return cleanedText;
    }
    return text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedText = checkForOffensiveContent(content);

    const formData = new FormData();
    formData.append('text', cleanedText);
    formData.append('image', content.image);
    formData.append('video', content.video);
    formData.append('audio', content.audio);
    formData.append('pdf', content.pdf);

    try {
      const response = await axios.post('https://server-update-x85v.onrender.com/api/share', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSharedContent((prevContent) => [...prevContent, response.data]);
      setContent({ text: '', image: null, video: null, audio: null, pdf: null });
      
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch shared content from the server
  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get('https://server-update-x85v.onrender.com/api/content');
        setSharedContent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSharedContent();
  }, []);

  return (
    <div>
      <h1>Public Space</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Text:</label>
          <textarea
            id="text"
            name="text"
            value={content.text}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="video">Video:</label>
          <input
            type="file"
            id="video"
            name="video"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="audio">Audio:</label>
          <input
            type="file"
            id="audio"
            name="audio"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="pdf">PDF:</label>
          <input
            type="file"
            id="pdf"
            name="pdf"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Share</button>
      </form>
      <div>
        <h2>Shared Content</h2>
        {sharedContent.map((item, index) => (
          <div key={index}>
            {item.text && <p>{item.text}</p>}
            {item.image && <img src={`https://server-update-x85v.onrender.com/uploads/${item.image}`} alt="Shared" />}
            {item.video && <video src={`https://server-update-x85v.onrender.com/uploads/${item.video}`} controls />}
            {item.audio && <audio src={`https://server-update-x85v.onrender.com/uploads/${item.audio}`} controls />}
            {item.pdf && <a href={`https://server-update-x85v.onrender.com/uploads/${item.pdf}`} target="_blank" rel="noopener noreferrer">View PDF</a>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicSpace;


