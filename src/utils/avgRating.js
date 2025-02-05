export default function GetAvgRating(ratingArr) {
  // Check if ratingArr is valid and not empty
  if (!Array.isArray(ratingArr) || ratingArr.length === 0) return 0;

  // Calculate the total sum of ratings
  const totalReviewCount = ratingArr.reduce((acc, curr) => {
    return acc + (curr?.rating || 0); // Safeguard against undefined or missing rating property
  }, 0);

  // Calculate the average rating and round to one decimal place
  const avgReviewCount = parseFloat(
    (totalReviewCount / ratingArr.length).toFixed(1)
  );

  // Return the rounded average rating
  return avgReviewCount;
}
