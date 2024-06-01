import { Tab, UserRatingTabsProps } from "@/app/_types/Index";

const UserRatingTabs = ({
  onTabClick,
  tabs,
  activeTab,
}: UserRatingTabsProps) => {
  console.log(activeTab);
  {
    return Object.entries(tabs).map(
      ([userSatus, tab]: [string, Tab[]], i: number) => {
        return (
          <div key={i} className="tab">
            <div>{userSatus}</div>
            <>
              {tab.map(({ is_positive, total, type, id }: Tab, i: number) => {
                return (
                  <span
                    className={`${is_positive ? "positive" : "negative"} ${
                      activeTab === id ? "active" : ""
                    }`}
                    key={i}
                    onClick={() => onTabClick(is_positive, type, id)}
                  >
                    {total}
                  </span>
                );
              })}
            </>
          </div>
        );
      }
    );
  }
};

export default UserRatingTabs;
