import React, { useEffect, useState } from "react";
import "./SiparisForm.css";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const materials = [
  "Pepperoni",
  "Sosis",
  "Domates",
  "Biber",
  "Mısır",
  "Sucuk",
  "Kanada Jambonu",
  "Ananas",
  "Tavuk Izgara",
  "Jalepeno",
  "Kabak",
  "Soğan",
  "Sarımsak",
];
const pizzaBoyu = ["Küçük", "Orta", "Büyük"];
const hamurKalinligi = ["Seçiniz", "İnce", "Normal", "Kalın", "Peynirli"];
const sizePrices = {
  kucuk: 0,
  orta: 10,
  buyuk: 20,
};

const initialValues = {
  size: "",
  hamur: "",
  material: [],
  fullName: "",
  note: "",
};

const errorMesages = {
  fullName: "İsminizi giriniz",
  material: "En az 4, en fazla 10 ürün seçmelisiniz.",
  size: "Pizza boyunu seçiniz",
  hamur: "Hamur tipini seçiniz",
};

const SiparisForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [isValid, setIsValid] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const clickHandler = (event) => {
    const { name, id, value } = event.target;
    if (name === "minus") {
      if (quantity > 1) setQuantity(quantity - 1);
    } else if (name === "plus") {
      setQuantity(quantity + 1);
    }
    if (name === "order") {
      history.push("/approval");
    }
  };
  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    if (name == "note") {
      setFormData({ ...formData, [name]: value });
    }
    if (name == "fullName") {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "size" && checked) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === "material") {
      let updatedMaterials = [...formData.material]; // Mevcut malzemelerin bir kopyasını alın
      if (checked) {
        updatedMaterials.push(value); // Seçilen malzemeyi ekle
      } else {
        updatedMaterials = updatedMaterials.filter(
          (material) => material !== value
        ); // Seçilmeyen malzemeyi filtrele
      }

      const updatedForm = {
        ...formData,
        [name]: updatedMaterials, // Malzemelerin güncellenmiş listesini formData'ya ata
      };
      setFormData(updatedForm); // formData'yı güncelle
    }
    if (name == "hamur") {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const priceCalculator = (formData, quantity, totalPrice) => {
      const selected = formData.material.length;
      let totalWithMaterials = 85 * quantity;
      if (formData.size === "Orta") {
        totalWithMaterials += 10;
      } else if (formData.size === "Büyük") {
        totalWithMaterials += 20;
      }
      totalWithMaterials += selected * 5;
      setTotalPrice(totalWithMaterials);
    };
    const validateForm = (formData) => {
      const materialValid =
        formData.material.length >= 4 && formData.material.length <= 10;
      const sizeValid = formData.size !== "";
      const hamurValid = formData.hamur !== "Seçiniz";
      const isimValid = formData.fullName.trim().length > 3;

      return materialValid && sizeValid && hamurValid && isimValid;
    };

    setIsValid(validateForm(formData));
    priceCalculator(formData, quantity, totalPrice);
    console.log(formData);
  }, [formData, quantity]);

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post("https://reqres.in/api/pizza", formData)
      .then((response) => {
        console.log(response.data);
        history.push("/approval");
      })
      .catch((error) => console.error(error));
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormGroup className="pizza-description">
        <h2>Acı Pizza</h2>
        <div className="price-details">
          <h3>85.50₺</h3>
          <p>4.9</p>
          <p>(200)</p>
        </div>
        <p>
          Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı
          pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
          diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
          ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak,
          düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli
          lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta denir.
        </p>
      </FormGroup>
      <FormGroup row className="hamur-boyut">
        <FormGroup row tag="fieldset" className="boyut-radio">
          <legend className="col-form-label col-sm-2">Radio Buttons</legend>
          <Col sm={3}>
            {pizzaBoyu.map((boyut) => {
              return (
                <FormGroup check>
                  <Input
                    key={boyut}
                    name="size"
                    type="radio"
                    onChange={handleChange}
                    value={boyut}
                    checked={formData.size === boyut}
                    data-cy="boyut"
                  />{" "}
                  <Label for="size" check>
                    {boyut}
                  </Label>
                </FormGroup>
              );
            })}
          </Col>
        </FormGroup>

        <FormGroup row className="hamur-select">
          <Label for="hamur" sm={2}>
            Hamur Seç
          </Label>
          <Col sm={3}>
            <Input
              name="hamur"
              type="select"
              onChange={handleChange}
              data-cy="kalinlik"
            >
              {hamurKalinligi.map((kalinlik) => {
                return <option key={kalinlik}> {kalinlik}</option>;
              })}
            </Input>
          </Col>
        </FormGroup>
      </FormGroup>
      <FormGroup col className="material-check">
        <Label for="material" sm={2}>
          Ek Malzemeler
        </Label>
        <Col sm={10}>
          <FormGroup check>
            {materials.map((material) => {
              return (
                <Label invalid check sm={5} for="material">
                  {/* buraya checkboxa margin  ekle 
                ve 
                text alignı iptal et 
                */}
                  <Input
                    name="material"
                    type="checkbox"
                    onChange={handleChange}
                    value={material}
                    checked={formData.material.includes(material)}
                  />
                  {material}
                </Label>
              );
            })}
            {(formData.material.length < 4 ||
              formData.material.length > 10) && (
              <Col>
                <FormText color="danger">{errorMesages.material}</FormText>
              </Col>
            )}
          </FormGroup>
        </Col>
      </FormGroup>
      <FormGroup row className="siparis-notu">
        <Label for="note" sm={2}>
          Sipariş Notu:
        </Label>
        <Col sm={10}>
          <Input
            id="note"
            name="note"
            type="textarea"
            placeholder="Sipariş notunuzu ekleyebilirsiniz"
            onChange={handleChange}
            value={formData.note}
          />
        </Col>
      </FormGroup>
      <FormGroup className="quantity-group">
        <CardGroup>
          <Label> Adet</Label>

          <Button
            type="button"
            name="minus"
            color="warning"
            onClick={clickHandler}
          >
            -
          </Button>
          <Col xs={1}>
            <FormText sm={2}>{quantity}</FormText>
          </Col>

          <Button
            type="button"
            name="plus"
            color="warning"
            onClick={clickHandler}
          >
            +
          </Button>
        </CardGroup>
      </FormGroup>
      <FormGroup row>
        <Label for="note" sm={2}>
          İsim Soyisim:
        </Label>

        <Col sm={10}>
          <Input
            name="fullName"
            type="textarea"
            placeholder="İsim giriniz"
            onChange={handleChange}
            value={formData.fullName}
          />
        </Col>
        {formData.fullName.trim().length < 4 && (
          <Col>
            <FormText color="danger">{errorMesages.fullName}</FormText>
          </Col>
        )}
      </FormGroup>
      <FormGroup className="siparis-ozeti" check row>
        <Card>
          <CardBody data-cy="toplam">
            <FormText>{`Toplam: ${totalPrice} `}</FormText>
          </CardBody>
          <Col
            sm={{
              offset: 2,
              size: 10,
            }}
          ></Col>

          <Button
            disabled={!isValid}
            name="order"
            color="warning"
            type="submit"
            data-cy="submit-btn"
          >
            Sipariş ver
          </Button>
        </Card>
      </FormGroup>
    </Form>
  );
};

export default SiparisForm;
