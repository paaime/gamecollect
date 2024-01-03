import {
  FaWikipediaW,
  FaFacebook,
  FaTwitter,
  FaTwitch,
  FaInstagram,
  FaYoutube,
  FaSteam,
  FaRedditAlien,
  FaDiscord,
} from 'react-icons/fa';
import { RiExternalLinkLine, RiTeamFill } from 'react-icons/ri';
import { SiEpicgames } from 'react-icons/si';
import { Website } from 'types/game';

const Website = ({ website }: { website: Website }) => {
  const Icon = () => {
    switch (website.category) {
      // official
      case 1:
        return <RiExternalLinkLine className="text-lg text-white" />;
      // wikia
      case 2:
        return <RiTeamFill className="text-lg text-white" />;
      // wikipedia
      case 3:
        return <FaWikipediaW className="text-lg text-white" />;
      // facebook
      case 4:
        return <FaFacebook className="text-lg text-white" />;
      // twitter
      case 5:
        return <FaTwitter className="text-lg text-white" />;
      // twitch
      case 6:
        return <FaTwitch className="text-lg text-white" />;
      // instagram
      case 8:
        return <FaInstagram className="text-lg text-white" />;
      // youtube
      case 9:
        return <FaYoutube className="text-lg text-white" />;
      // steam
      case 13:
        return <FaSteam className="text-lg text-white" />;
      // reddit
      case 14:
        return <FaRedditAlien className="text-lg text-white" />;
      // epicgames
      case 16:
        return <SiEpicgames className="text-lg text-white" />;
      // discord
      case 18:
        return <FaDiscord className="text-lg text-white" />;
    }
  };

  const Text = () => {
    switch (website.category) {
      // official
      case 1:
        return 'Website';
      // wikia
      case 2:
        return 'Community Wiki';
      // wikipedia
      case 3:
        return 'Wikipedia';
      // facebook
      case 4:
        return 'Facebook';
      // twitter
      case 5:
        return 'Twitter';
      // twitch
      case 6:
        return 'Twitch';
      // instagram
      case 8:
        return 'Instagram';
      // youtube
      case 9:
        return 'Youtube';
      // steam
      case 13:
        return 'Steam';
      // reddit
      case 14:
        return 'Reddit';
      // epicgames
      case 16:
        return 'Epic Games';
      // discord
      case 18:
        return 'Discord';
    }
  };

  return (
    <a
      className="flex w-fit items-center gap-2 rounded-lg border-2 border-navy-700 px-4 py-3 text-sm"
      href={`${website.url}`}
      target="_blank"
    >
      <Icon />
      <p className="ml-2 font-medium text-white">{Text()}</p>
    </a>
  );
};

export default function Websites({ websites }: { websites: Website[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-5 pb-10">
      {websites.map((website, key) => (
        <Website key={key} website={website} />
      ))}
    </div>
  );
}
