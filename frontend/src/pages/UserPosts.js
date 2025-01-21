import PostGrid from "components/Posts/DisplayPosts";

const UserPosts = ({ _id }) => {
  console.log(_id);

  return (
    <div className="p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">User Dashboard</h1>
      <PostGrid userId={_id} isAdmin={false} />
    </div>
  );
};

export default UserPosts;
