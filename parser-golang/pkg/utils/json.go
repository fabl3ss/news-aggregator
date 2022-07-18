package utils

import (
	"bytes"
	"encoding/json"
)

func FormatJSON(ParserNewsResponse []byte) ([]byte, error) {
	var out bytes.Buffer
	err := json.Indent(&out, ParserNewsResponse, "", "    ")
	if err == nil {
		return out.Bytes(), err
	}
	return ParserNewsResponse, nil
}
