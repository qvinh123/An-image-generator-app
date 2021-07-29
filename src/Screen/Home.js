import React, { useCallback, useEffect, useState } from "react";

import Button from "../Components/Button/Button";
import ButtonChoose from "../Components/ButtonChoose/ButtonChoose";
import AlpacaImage from "../Components/AlpacaImage/AlpacaImage";

import { importImage } from "../helper/importImage";

import { data } from "../data";

import classes from "./Home.module.css";

import { toPng } from "html-to-image";
import download from "downloadjs";

export default function Home() {
    const [hair, setHair] = useState(null);
    const [ears, setEars] = useState(null);
    const [eyes, setEyes] = useState(null);
    const [mouth, setMouth] = useState(null);
    const [neck, setNeck] = useState(null);
    const [leg, setLeg] = useState(null);
    const [nose, setNose] = useState(null);
    const [accessories, setAccessories] = useState(null);
    const [background, setBackground] = useState(null);
    const [filterByName, setFilterByName] = useState(data[0].nameFolder);

    const [dataState, setDataState] = useState(data)

    const setActiveBtn = (objIngredient, objStyle) => {
        const cloneData = [...dataState]
        const indexNameFolder = cloneData.indexOf(objIngredient)
        const indexNameFile = cloneData[indexNameFolder].items.indexOf(objStyle)
        cloneData[indexNameFolder].items.forEach(ac => ac.active = false)
        cloneData[indexNameFolder].items[indexNameFile].active = true
        setDataState(cloneData)
    }

    // ========== Change Image ==========
    const changeImage = (objIngredient, objStyle) => {
        setActiveBtn(objIngredient, objStyle)

        const { nameFolder } = objIngredient
        const { nameFile } = objStyle

        importImage(nameFolder, nameFile, (image) => {
            switch (nameFolder) {
                case "hair":
                    setHair(image);
                    break;
                case "ears":
                    setEars(image);
                    break;
                case "eyes":
                    setEyes(image);
                    break;
                case "mouth":
                    setMouth(image);
                    break;
                case "neck":
                    setNeck(image);
                    break;
                case "leg":
                    setLeg(image);
                    break;
                case "nose":
                    setNose(image);
                    break;
                case "accessories":
                    setAccessories(image);
                    break;
                case "backgrounds":
                    setBackground(image);
                    break;
                default:
                    break;
            }
        });
    }


    // ========== Render List Choose Top ==========
    const renderChooseTop = () => {
        return dataState.map((objIngredient) => {
            let style = {}
            if (objIngredient.nameFolder === filterByName) {
                style = {
                    backgroundColor: `${"var(--color-bg)"}`,
                    color: `${"var(--color-white)"}`,
                    border: `1px solid ${"var(--color-bg)"}`,
                }
            }
            return (
                <ButtonChoose
                    style={style}
                    click={() => {
                        setFilterByName(objIngredient.nameFolder);
                    }}
                    key={objIngredient.name}
                    name={objIngredient.name}
                    label={objIngredient.nameFolder}
                />
            );
        });
    }


    // ========== Render List Choose Bottom ==========
    const renderChooseBottom = () => {
        return dataState
            .filter(objIngredient => objIngredient.nameFolder === filterByName)
            .map((objIngredient) => {
                return objIngredient.items.map(item => {
                    return (
                        <ButtonChoose
                            active={item.active}
                            click={() => changeImage(objIngredient, item)}
                            key={item.name}
                            name={item.name}
                            label={item.nameFolder}
                        />
                    );
                });
            });
    }


    // ========== DownLoad PNG Alpaca ==========
    const downloadPNG = () => {
        toPng(document.getElementById("alpaca__image-download")).then((dataUrl) => {
            download(dataUrl, "alpaca.png");
        });
    }


    // ========== Random Ingrdient Alpaca ==========
    const random = () => {
        return dataState.map(objIngredient => {
            const resultRandom = Math.floor(Math.random() * objIngredient.items.length);
            return objIngredient.items
                .filter((item) => item.id === resultRandom)
                .map((item) => changeImage(objIngredient, item));
        });
    }


    // ========== Render Alpaca Default ==========
    const renderAlpacaDefault = () => {
        dataState.forEach(objIngredient => {
            changeImage(objIngredient, objIngredient.items[0]);
        });
    }

    useEffect(() => {
        renderAlpacaDefault();
    }, []);

    const propsImageAlpaca = {
        hair,
        ears,
        eyes,
        mouth,
        neck,
        leg,
        nose,
        accessories,
        background,
    };

    return (
        <div className={classes.alpaca__content}>
            <div className={classes["alpaca__content--left"]}>
                <div id="alpaca__image-download" class={classes.alpaca__image}>
                    <AlpacaImage propsImageAlpaca={propsImageAlpaca} />
                </div>

                <div className={classes["alpaca__list--btn"]}>
                    <Button click={() => { random() }}>
                        <span className={classes.alpaca__icon}>
                            <i className="fas fa-random"></i>
                        </span>
                        <span className={classes.alpaca__text}>Random</span>
                    </Button>
                    <Button click={() => downloadPNG()}>
                        <span className={classes.alpaca__icon}>
                            <i className="fas fa-download"></i>
                        </span>
                        <span className={classes.alpaca__text}>Download</span>
                    </Button>
                </div>
            </div>

            <div className={classes["alpaca__content--right"]}>
                <div className={classes.alpaca__choose}>
                    <div className={classes["alpaca__choose--top"]}>
                        <h3>Accessorize your Alpaca</h3>
                        <ul>{renderChooseTop()}</ul>
                    </div>
                    <div className={classes["alpaca__choose--bottom"]}>
                        <h3>{filterByName}</h3>
                        <ul>{renderChooseBottom()}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
