package domain

type News struct {
	Title           string   `json:"title"`
	Link            string   `json:"link"`
	Keywords        []string `json:"keywords"`
	Creator         []string `json:"creator"`
	VideoUrl        string   `json:"video_url"`
	Description     string   `json:"description"`
	Content         string   `json:"content"`
	PubDate         string   `json:"pubDate"`
	FullDescription string   `json:"full_description"`
	ImageUrl        string   `json:"image_url"`
	SourceId        string   `json:"source_id"`
	Language        string   `json:"language"`
}
