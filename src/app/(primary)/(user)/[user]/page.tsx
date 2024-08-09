import React from "react";

function UserPage({ params }: { params: { user: string } }) {
  return <div>{params.user}</div>;
}

export default UserPage;
