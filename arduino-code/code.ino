const int trigPin = 7;
const int echoPin = 8;


const int MAX_OUTPUT_LENGTH = 10;
int outputData[MAX_OUTPUT_LENGTH];
int outputLength = 0;

void setup() {
// initialize serial communication:
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode (echoPin, INPUT);
}
void loop() {
// establish variables for duration of the ping, and the distance result
// in inches and centimeters:
// The PING))) is triggered by a HIGH pulse of 2 or more microseconds.
// Give a short LOW pulse beforehand to ensure a clean HIGH pulse:
  digitalWrite(trigPin, LOW);
  delayMicroseconds (2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds (10);
  digitalWrite(trigPin, LOW);
  
  long duration = pulseIn(echoPin, HIGH);
  long mm = microsecondsToMillimeters(duration);

  outputData[outputLength++] = mm;

  if (outputLength == MAX_OUTPUT_LENGTH) {
    // Serial outputData[1], outputData[2], outputData[3], outputData[4], outputData[5], outputData[6], outputData[7], outputData[8], outputData[9], outputData[10], outputData[11], outputData[12], outputData[13], outputData[14], outputData[15], outputData[16], outputData[17], outputData[18], outputData[19]);
    for (int i = 0; i < MAX_OUTPUT_LENGTH; i++) {
      Serial.print(outputData[i]);
      if (i != MAX_OUTPUT_LENGTH - 1) {
      Serial.print(" ");
      }
    }
    Serial.println();
    outputLength = 0;
  }

  delay(50);
}

long microsecondsToMillimeters (long microseconds) {
  return microseconds * 10 / 29 / 2;
}