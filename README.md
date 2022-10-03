## News Aggregator
#### A project that created for filtering and displaying of personalized information to the user from news resources.  
The created application can search for the latest news by the keyword entered, using the *newsdata.io* API. 
The resulting data is processed by a backend written in *Go*. 
Then the data is transmitted via http request to the summarizer server, which processes the input text and returns an abbreviated and concise excerpt. 
The server with the summarizer is written in *Python* using *FastAPI*. Interaction with the user is implemented using *React JS* GUI. 
The project follows the pattern of clean code and microservices architecture.  
Contributors: [Mevnk](https://github.com/Mevnk), [fabl3ss](https://github.com/fabl3ss), [timofeyka25](https://github.com/timofeyka25)

### Execution example
<img align="center" width="70%" height="70%" src="http://drive.google.com/uc?export=view&id=1jxbugm7JJHdJSHVgNtfYI1wTA22XfJ2A">
