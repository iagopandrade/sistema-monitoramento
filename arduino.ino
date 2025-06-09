const int sensorPressao = A0;
const int sensorVazao = A1;

void setup() {
  Serial.begin(9600);
}

void loop() {
  int leituraPressao = analogRead(sensorPressao);
  int leituraVazao = analogRead(sensorVazao); 
  
  float tensaoPressao = leituraPressao * (5.0 / 1023.0);
  float tensaoVazao   = leituraVazao * (5.0 / 1023.0);
  
  float pressao = tensaoPressao * 2.0; 
  float vazao = tensaoVazao * 4.0; 

  Serial.print("Pressao: ");
  Serial.print(pressao, 2); 
  Serial.print(" bar\tVazao: ");
  Serial.print(vazao, 2);
  Serial.print(" L/s\n");
  
  delay(5000);
}