
import Sentiment from "sentiment";
const sentiment = new Sentiment();


export const enhanceSentiment = (articles = []) => {
    let sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
    let overall = "neutral";

    for (const article of articles) {
        const content = `${article.title || ""} ${article.description || ""}`.trim();
        const result = sentiment.analyze(content);

        console.log(`Article Score:`, result.score, "|", content.slice(0, 80));


        if (result.score > 0) sentimentCounts.positive++;
        else if (result.score < 0) sentimentCounts.negative++;
        else sentimentCounts.neutral++;
    }

    if (sentimentCounts.positive > sentimentCounts.negative) overall = "positive";
    else if (sentimentCounts.negative > sentimentCounts.positive) overall = "negative";

    return { ...sentimentCounts, overall };
};
