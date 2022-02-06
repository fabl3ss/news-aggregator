package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

const requestURL = "http://127.0.0.1:8000/ai"

type request struct {
	Text      string `json:"text"`
	Language  string `json:"language"`
	Sentences string `json:"sentences"`
}

type responce struct {
	Text string `json:"responce"`
}

func makeRequest(text, language, sentences string) string {
	requestBody, err := json.Marshal(request{
		Text:      text,
		Language:  language,
		Sentences: sentences,
	})

	if err != nil {
		log.Panic("Error occurred while making json: ", err.Error())
	}

	resp, err := http.Post(requestURL, "application/json", bytes.NewBuffer(requestBody))
	if err != nil {
		log.Panic("Error occurred while sending http request: ", err.Error())
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Panic("Error occurred while reading responce: ", err.Error())
	}

	var responceResult responce
	err = json.Unmarshal(body, &responceResult)
	if err != nil {
		log.Panic("Error occurred while decoding responce: ", err.Error())
	}

	return responceResult.Text
}

func main() {
	text := "Russian President Vladimir Putin on Sunday said he is weighing a number of options if the West fails to accede to his demands for security guarantees on NATO expansion in Ukraine. The Kremlin earlier this month released draft security documents calling on NATO to deny Ukraine and other former Soviet republics membership and to curtail allowing military expansion into Eastern Europe. He reiterated his assertion that allowing Ukraine into the alliance or deploying troops or weapons there would be a “red line” for Russia. “We have nowhere to retreat,” he said, pointing out that any missiles placed in Ukraine would be able to reach Russia in under five minutes, posing a threat to the country. “They have pushed us to a line that we can't cross. They have taken it to the point where we simply must tell them: 'Stop!'” he said. Putin last week demanded that the West “immediately” respond to his calls for security guarantees and said he would take “ military-technical measures ” if the US and its European allies continue their aggressive behavior. Asked what his response would be, Putin said they “could be diverse,” adding that it would depend “on what our military experts submit to me.” President Biden and other European leaders have said they will not offer Putin the guarantees he's seeking. Biden also said that Russia, which has built up a force of as many as 175,000 troops on its eastern border with Ukraine, would face “severe consequences” if it launches an invasion. But the US and Europe have agreed to begin negotiations with Moscow next month in Geneva. Putin on Sunday said he's seeking concrete assurances from the West on the guarantees. “We didn't do it just to see it blocked … but for the purpose of reaching a negotiated diplomatic result that would be fixed in legally binding documents,” he said. “We have just one goal — to reach agreements that would ensure the security of Russia and its citizens now and in a long-term perspective,” Putin said. The massive troop and equipment buildup on the Ukrainian border is a prelude to an invasion, US and European officials believe. In 2014, Russia illegally annexed the Crimean Peninsula in the Black Sea, leading to a series of economic sanctions by the US and the European Union. With Post wires"
	log.Println(makeRequest(text, "english", "5"))
}
