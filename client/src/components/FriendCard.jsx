import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { IoRemoveCircleOutline } from "react-icons/io5";


const FriendCard = ({ friend ,onDelete}) => {

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center justify-between w-full px-4 py-2">
                    <div className="flex items-center justify-between gap-3">
                        <div className=" p-1 rounded ">
                            <img className="h-14 w-14" src={friend.profilePic} alt={friend.fullName} />
                        </div>
                        <p className="text-lg avatar text-gray-800">{friend.fullName}</p>
                    </div>
                    <button type="button" aria-label="more">
                        <IoRemoveCircleOutline className="flex justify-end"
                         onClick={() => onDelete(friend.senderId, friend.recipientId)}
                        />
                    </button>
                </div>
      
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full">
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

// eslint-disable-next-line react-refresh/only-export-components
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}