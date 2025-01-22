import PostGrid from "components/Posts/DisplayPosts";

// this page is made to view post created by any user
const UserPosts = ({ _id }) => {
  return (
    <div className="p-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">Posts</h1>
      <PostGrid userId={_id} isAdmin={false} />
    </div>
  );
};

export default UserPosts;
