import { TEXT } from "@/app/_constants";
import { Rating } from "@/app/_types/Index";
import { getGrade, getGraderName } from "@/app/_utils";

const UserRating = (rating: Rating) => {
  const { agreement, communication, description, comment, listing, payment } =
    rating;

  return (
    <div className="rating">
      {getGraderName(rating)}
      <div>{listing.title}</div>
      <div>
        {description !== null
          ? TEXT.LISTING_DESCRIPTION_IS_CORRECT
          : TEXT.LISTING_PAYMENT_WAS_CORRECT}
        :{getGrade(description !== null ? description : payment)}
      </div>
      <div>
        {TEXT.LISTING_COMMUNICATION_WAS_CORRECT}: {getGrade(communication)}
      </div>
      <div>
        {TEXT.LISTING_DEAL_WAS_RESPECTED}: {getGrade(agreement)}
      </div>
      {comment && <div dangerouslySetInnerHTML={{ __html: comment }}></div>}
    </div>
  );
};

export default UserRating;
