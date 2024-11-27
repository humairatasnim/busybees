import { Link } from "react-router-dom";
import "./ChoreList.scss";

function ChoreList({ chores, profiles }) {
  return (
    <ul className="chore__list">
      {chores.map((chore) => {
        const {
          name: assigneeName = "Unassigned",
          avatar: assigneeAvatar = "Unassigned",
        } = profiles.find((profile) => profile.id === chore.profile_id) || {};

        const isComplete = chore.completed;

        return (
          <li
            key={chore.id}
            className={`chore__item ${
              isComplete ? "chore__item--completed" : ""
            }`}
          >
            <Link to={`/chores/${chore.id}`} className="chore__link">
              <div className="chore__header">
                <div className="chore__image-wrapper">
                  <img
                    src={chore.emoji}
                    alt={`Emoji for ${chore.title}`}
                    className="chore__image"
                  />
                </div>
                <div
                  className={`chore__title ${
                    isComplete ? "chore__title--completed" : ""
                  }`}
                >
                  {chore.title}
                </div>
              </div>

              <div className="chore__details">
                <div className="chore__image-wrapper">
                  <img
                    src={assigneeAvatar}
                    alt={`Assigned to ${assigneeName}`}
                    className="chore__image"
                  />
                </div>
                <div className="chore__reward">
                  {chore.reward_points}{" "}
                  <i className="star-icon fa-solid fa-star"></i>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ChoreList;
