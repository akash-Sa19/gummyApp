import axios from "axios";

export async function getScrapedData(query, setIsFetching) {
  try {
    // Replace with your server's URL if it's hosted externally
    const response = await axios.post(
      `${import.meta.env.VITE_BACK_END_SERVER_URL}/scrape`,
      {
        queryString: query.queryString,
        orderBy: query.orderBy,
        searchType: query.searchType,
        maxResult: parseInt(query.maxResult),
        sortBy: query.sortBy,
      },
      {
        headers: {
          "Content-Type": "application/json",
          //   Accept: "application/json",
        },
      }
    );

    // Check if the response is successful (axios automatically handles this)
    if (!response.data.success) {
      throw new Error("Failed to fetch scraped data");
    }

    setIsFetching(false);

    // Return the data or manipulate it as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching scraped data:", error);
  }
}
