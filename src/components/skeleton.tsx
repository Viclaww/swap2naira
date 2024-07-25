import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "100%",
  borderRadius = "4px",
}) => {
  return (
    <div
      className="skeleton animate-pulse bg-white/40"
      style={{ width, height, borderRadius }}
    ></div>
  );
};

export default Skeleton;
