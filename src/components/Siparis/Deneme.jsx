import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  FormFeedback,
  CardTitle,
  CardBody,
  Card,
  CardText,
} from "reactstrap";
import axios from "axios";

import { useHistory } from "react-router-dom";

const initialForm = {
  fullName: "",
  size: "",
  thickness: "",
  material: [],
  text: "",
};

const materialOptions = [
  "Pepperoni",
  "Domates",
  "Biber",
  "Sosis",
  "Mısır",
  "Sucuk",

  "Tavuk",
  "Jalepeno",
  "Kabak",
  "Ananas",
  "Zeytin",
  "Mantar",
  "Kanada Jambonu",
];

const materialPrices = {
  Pepperoni: 5,
  Domates: 5,
  Biber: 5,
  Sosis: 5,
  Mısır: 5,
  Sucuk: 5,
  Tavuk: 5,
  Jalepeno: 5,
  Kabak: 5,
  Ananas: 5,
  Zeytin: 5,
  Mantar: 5,
  "Kanada Jambonu": 5,
};
const sizePrices = {
  kucuk: 0,
  orta: 10,
  buyuk: 20,
};

export default function Order() {
  const [form, setForm] = useState(initialForm);
  const [formValid, setFormValid] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [totalPrice, setTotalPrice] = useState(85.5);
  const [xTimes, setXTimes] = useState(1);

  useEffect(() => {
    const materialsPrice = selectedMaterials.reduce(
      (total, material) => total + materialPrices[material],
      0
    );
    const sizePrice = sizePrices[form.size] || 0;
    setTotalPrice(85.5 + materialsPrice + sizePrice);
  }, [selectedMaterials, form.size]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    let updatedMaterials = selectedMaterials;

    if (type === "checkbox") {
      if (checked) {
        updatedMaterials = [...selectedMaterials, value];
      } else {
        updatedMaterials = selectedMaterials.filter(
          (material) => material !== value
        );
      }
    } else if (type === "radio" && checked) {
      setForm({
        ...form,
        [name]: value,
      });
      validateForm({ ...form, [name]: value });
      return;
    }

    const updatedForm = {
      ...form,
      [name]: type === "checkbox" ? updatedMaterials : value,
    };

    setForm(updatedForm);
    setSelectedMaterials(updatedMaterials);
    validateForm(updatedForm);
  };

  const validateForm = (formData) => {
    const isNameValid = formData.fullName.length >= 3;
    const isMaterialValid =
      formData.material.length >= 4 && formData.material.length <= 10;
    const isSizeSelected = formData.size !== "";
    const isThicknessSelected = formData.thickness !== "";

    setFormValid(
      isNameValid && isMaterialValid && isSizeSelected && isThicknessSelected
    );
  };
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataWithTotalPrice = {
      ...form,
      totalPrice: totalPrice,
      xTimes: xTimes,
    };
    return !formValid
      ? (disabled = { handleSubmit })
      : axios
          .post("https://reqres.in/api/pizza", formDataWithTotalPrice)
          .then((response) => {
            console.log("API Response:", response.data);

            history.push("/success", { responseData: response.data });
          })
          .catch((error) => {
            console.error("API Request Error:", error);
          });
  };

  const handlePricePlsus = (event) => {
    setXTimes(xTimes + 1);
  };
  const handlePriceMinus = (event) => {
    setXTimes(xTimes - 1);
    if (xTimes <= 1) {
      setXTimes(1);
    }
  };

  return (
    <>
      <div className="orderContainer">
        <Form onSubmit={handleSubmit} disabled={!formValid}>
          <section className="pastry">
            <FormGroup tag="fieldset">
              <legend>
                Boyut Seç<FormText color="danger">*</FormText>
              </legend>
              <FormGroup check>
                <Label check>
                  <Input
                    id="size-small"
                    data-cy="size-small"
                    name="size"
                    type="radio"
                    onChange={handleChange}
                    value="kucuk"
                    checked={form.size == "kucuk"}
                  />{" "}
                  Küçük
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="size-medium"
                    name="size"
                    type="radio"
                    onChange={handleChange}
                    value="orta"
                    checked={form.size == "orta"}
                  />{" "}
                  Orta
                  <span style={{ color: "rgba(255, 0, 0, 0.5)" }}>(+10 ₺)</span>
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="size-large"
                    name="size"
                    type="radio"
                    onChange={handleChange}
                    value="buyuk"
                    checked={form.size == "buyuk"}
                  />{" "}
                  Büyük
                  <span style={{ color: "rgba(255, 0, 0, 0.5)" }}>(+20 ₺)</span>
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup>
              <legend htmlFor="thickness">
                Hamur Seç<FormText color="danger">*</FormText>
              </legend>
              <Input
                id="thickness"
                data-cy="thickness"
                name="thickness"
                type="select"
                onChange={handleChange}
              >
                <option></option>
                <option>Ince</option>
                <option>Orta</option>
                <option>Kalın</option>
              </Input>
            </FormGroup>
          </section>

          <section className="materials">
            <FormGroup check>
              <legend>Ek Malzemeler</legend>
              <FormText color="danger">
                En az 4, en fazla 10 malzeme seçimi yapmalısınız.(+5 ₺)
              </FormText>
              <div className="checkbox-container">
                {materialOptions.map((material, index) => (
                  <div className="checkbox-row" key={index}>
                    <Label for={`material${index + 1}`} check>
                      <Input
                        id={`material${index + 1}`}
                        data-cy={`material-checkbox-${material}`}
                        type="checkbox"
                        name="material"
                        value={material}
                        onChange={handleChange}
                      />{" "}
                      {material}
                    </Label>
                  </div>
                ))}
              </div>
            </FormGroup>
          </section>
          <FormGroup>
            <Label for="fullName">Ad Soyad:</Label>
            <Input
              id="fullName"
              name="fullName"
              data-cy="fullName"
              placeholder="ad ve soyadı"
              type="text"
              onChange={handleChange}
              invalid={form.fullName.length > 0 && form.fullName.length < 3}
            />
            <FormFeedback>En az 3 karakter girilmelidir.</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Label for="text">Sipariş Notu:</Label>
            <Input
              id="text"
              data-cy="textarea"
              name="text"
              type="textarea"
              onChange={handleChange}
            />
          </FormGroup>
          <hr></hr>

          <footer className="formCard">
            <section className="piecesBtn">
              <Button type="button" color="warning" onClick={handlePriceMinus}>
                -
              </Button>
              <span style={{ margin: "0 10px" }}>{xTimes}</span>
              <Button type="button" color="warning" onClick={handlePricePlsus}>
                +
              </Button>
            </section>
            <section>
              <Card style={{ width: "18rem" }}>
                <CardTitle tag="h5">Sipariş Toplamı</CardTitle>
                <CardBody>
                  <CardText>Seçimler: {totalPrice - 85.5} ₺</CardText>
                  <CardText>
                    <span style={{ color: "#CE2829" }}>
                      Toplam: {totalPrice} ₺ X{xTimes}
                    </span>
                  </CardText>
                </CardBody>
                <Button color="warning" type="submit" disabled={!formValid}>
                  Sipariş Ver
                </Button>
              </Card>
            </section>
          </footer>
        </Form>
      </div>
    </>
  );
}
