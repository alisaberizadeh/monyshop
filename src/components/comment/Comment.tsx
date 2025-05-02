
import React from "react";

type CommentProps = {
  avatarUrl: string;
  name: string;
  date: string;
  comment: string;
};

const Comment = ({ avatarUrl, name, date, comment }: CommentProps) => {
  return (
    <div className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm border my-5">
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">{name} <span className="ml-4 text-gray-400 font-normal">{date}</span> </h4>
        </div>
        <p className="text-gray-700 mt-1">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
