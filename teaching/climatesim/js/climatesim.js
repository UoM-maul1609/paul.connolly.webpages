(() => {
  "use strict";

  const defaults = { ch4: 1.75, co2: 385, cloud: 0.7, albedo: 0.4 };
  const constants = {
    solarFlux: 1368,
    sigma: 5.67e-8,
    atmosphericPressure: 100000,
    clearSurfaceAlbedo: 0.15,
    waterVapourPartialPressure: 18
  };

  const els = {
    ch4: document.querySelector("#ch4"),
    co2: document.querySelector("#co2"),
    cloud: document.querySelector("#cloud"),
    albedo: document.querySelector("#albedo"),
    ch4Output: document.querySelector("#ch4-output"),
    co2Output: document.querySelector("#co2-output"),
    cloudOutput: document.querySelector("#cloud-output"),
    albedoOutput: document.querySelector("#albedo-output"),
    surfaceC: document.querySelector("#surface-temp-c"),
    surfaceK: document.querySelector("#surface-temp-k"),
    effective: document.querySelector("#effective-temp"),
    planetaryAlbedo: document.querySelector("#planetary-albedo"),
    opticalDepth: document.querySelector("#optical-depth"),
    commentary: document.querySelector("#commentary"),
    cloudLayer: document.querySelector("#cloud-layer"),
    cowLayer: document.querySelector("#cow-layer"),
    co2Plume: document.querySelector("#co2-plume"),
    solarReflected: document.querySelector("#solar-reflected"),
    solarIn: document.querySelector("#solar-in"),
    irUp: document.querySelector("#ir-up"),
    irDown: document.querySelector("#ir-down"),
    albedoGroup: document.querySelector("#albedo-group"),
    reset: document.querySelector("#reset-model")
  };

  if (!els.ch4) return;

  let lastChanged = null;
  const reference = calculate(defaults);

  function values() {
    return {
      ch4: Number(els.ch4.value),
      co2: Number(els.co2.value),
      cloud: Number(els.cloud.value),
      albedo: Number(els.albedo.value)
    };
  }

  function calculate(v) {
    const planetaryAlbedo = v.cloud * v.albedo + (1 - v.cloud) * constants.clearSurfaceAlbedo;
    const absorbedSolar = constants.solarFlux / 4 * (1 - planetaryAlbedo);
    const effectiveTemp = absorbedSolar <= 0 ? 0 : Math.pow(absorbedSolar / constants.sigma, 0.25);

    const eCO2 = v.co2 * 1e-6 * constants.atmosphericPressure;
    const eCH4 = v.ch4 * 1e-6 * constants.atmosphericPressure;
    const eH2O = constants.waterVapourPartialPressure;

    const tauCO2 = 0.029 * Math.sqrt(eCO2);
    const tauH2O = 0.087 * Math.sqrt(eH2O);
    const tauCH4 = 0.029 * 25 * Math.sqrt(eCH4);
    const opticalDepth = tauCO2 + tauH2O + tauCH4;
    const surfaceTemp = effectiveTemp * Math.pow(1 + 0.75 * opticalDepth, 0.25);

    return { planetaryAlbedo, effectiveTemp, surfaceTemp, opticalDepth, tauCO2, tauH2O, tauCH4 };
  }

  function formatNumber(n, digits = 1) {
    return Number.isFinite(n) ? n.toFixed(digits) : "—";
  }

  function updateOutputs(v, r) {
    els.ch4Output.textContent = `${v.ch4.toFixed(2)} ppm`;
    els.co2Output.textContent = `${Math.round(v.co2)} ppm`;
    els.cloudOutput.textContent = `${Math.round(v.cloud * 100)}%`;
    els.albedoOutput.textContent = `${Math.round(v.albedo * 100)}%`;

    els.surfaceC.textContent = `${formatNumber(r.surfaceTemp - 273.15, 1)} °C`;
    els.surfaceK.textContent = `${formatNumber(r.surfaceTemp, 1)} K`;
    els.effective.textContent = `${formatNumber(r.effectiveTemp, 1)} K`;
    els.planetaryAlbedo.textContent = formatNumber(r.planetaryAlbedo, 3);
    els.opticalDepth.textContent = formatNumber(r.opticalDepth, 3);

    const noCloud = v.cloud === 0;
    els.albedo.disabled = noCloud;
    els.albedoGroup.classList.toggle("disabled", noCloud);
    els.albedoGroup.setAttribute("aria-disabled", String(noCloud));
  }

  const cloudPositions = [
    [8, 20], [28, 13], [48, 24], [69, 17], [80, 30],
    [16, 34], [39, 37], [61, 35], [7, 43], [75, 44]
  ];
  const cowPositions = [
    [5, 1.0], [16, .78], [29, .92], [41, .7], [53, .82],
    [64, .64], [74, .75], [21, .58], [46, .56]
  ];

  function updateScene(v, r) {
    const cloudCount = Math.round(v.cloud * 10);
    els.cloudLayer.innerHTML = "";
    for (let i = 0; i < cloudCount; i += 1) {
      const img = document.createElement("img");
      img.src = "assets/cloud/cloud.svg";
      img.alt = "";
      img.className = "cloud";
      img.style.left = `${cloudPositions[i][0]}%`;
      img.style.top = `${cloudPositions[i][1]}%`;
      const opacity = Math.max(0.18, Math.min(1, 0.22 + v.albedo * 0.9));
      const brightness = 0.82 + v.albedo * 0.42;
      img.style.opacity = String(opacity);
      img.style.filter = `brightness(${brightness}) drop-shadow(0 3px 3px rgba(0,0,0,.08))`;
      els.cloudLayer.appendChild(img);
    }

    const methaneFraction = (v.ch4 - 0.75) / (5 - 0.75);
    const cowCount = Math.max(1, Math.round(1 + methaneFraction * 8));
    els.cowLayer.innerHTML = "";
    for (let i = 0; i < cowCount; i += 1) {
      const img = document.createElement("img");
      img.src = "assets/cow/cow.svg";
      img.alt = "";
      img.className = "cow";
      img.style.left = `${cowPositions[i][0]}%`;
      img.style.transform = `scale(${cowPositions[i][1]})`;
      img.style.transformOrigin = "bottom left";
      img.style.zIndex = String(10 + Math.round(cowPositions[i][1] * 10));
      els.cowLayer.appendChild(img);
    }

    const co2Fraction = (v.co2 - 280) / (1000 - 280);
    els.co2Plume.style.opacity = String(0.18 + co2Fraction * 0.72);

    const reflected = Math.max(0.06, Math.min(1, r.planetaryAlbedo));
    els.solarReflected.style.opacity = String(0.12 + reflected * 0.78);
    els.solarReflected.style.strokeWidth = String(3 + reflected * 14);
    els.solarIn.style.opacity = String(0.82 - reflected * 0.15);

    const greenhouse = Math.max(0, Math.min(1, (r.opticalDepth - 0.45) / 1.25));
    els.irDown.style.opacity = String(0.12 + greenhouse * 0.72);
    els.irDown.style.strokeWidth = String(3 + greenhouse * 10);
    els.irUp.style.opacity = String(0.82 - greenhouse * 0.4);
    els.irUp.style.strokeWidth = String(9 - greenhouse * 3);
  }

  function commentaryFor(type, v, r) {
    const delta = r.surfaceTemp - reference.surfaceTemp;
    const deltaC = `${delta >= 0 ? "+" : ""}${delta.toFixed(1)} °C`;
    const extreme = r.surfaceTemp < 180 || r.surfaceTemp > 330;
    let title = "Try an experiment";
    let text = "Change one variable, note the temperature response, then press Reset before testing another. This makes cause and effect easier to see.";

    if (type === "ch4") {
      title = "Methane changes infrared absorption";
      text = `The model methane concentration is now ${v.ch4.toFixed(2)} ppm. Methane increases the infrared optical depth, so more infrared energy is retained in the simple atmosphere. Relative to the reference settings, the model surface temperature differs by ${deltaC}.`;
    } else if (type === "co2") {
      title = "Carbon dioxide changes infrared absorption";
      text = `The model CO₂ concentration is now ${Math.round(v.co2)} ppm. Higher CO₂ increases the infrared optical depth and raises the model surface temperature. Relative to the reference settings, the difference is ${deltaC}.`;
    } else if (type === "cloud") {
      title = "Cloud fraction changes reflected sunlight";
      text = `Cloud covers ${Math.round(v.cloud * 100)}% of the model planet. In this model, clouds affect temperature only by changing planetary albedo: more reflective cloud cover sends more incoming solar energy back to space. The temperature difference from the reference settings is ${deltaC}.`;
    } else if (type === "albedo") {
      title = "Cloud albedo controls reflectivity";
      text = `The cloud albedo is ${Math.round(v.albedo * 100)}%. Higher cloud albedo means a larger fraction of sunlight is reflected, which reduces absorbed solar energy and cools the model surface. The temperature difference from the reference settings is ${deltaC}.`;
    }

    if (extreme) {
      text += " This combination is an extreme, hypothetical state; do not interpret it as a realistic Earth climate.";
    }
    els.commentary.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
  }

  function render(type = lastChanged) {
    const v = values();
    const r = calculate(v);
    updateOutputs(v, r);
    updateScene(v, r);
    commentaryFor(type, v, r);
  }

  ["ch4", "co2", "cloud", "albedo"].forEach((name) => {
    els[name].addEventListener("input", () => {
      lastChanged = name;
      render(name);
    });
  });

  els.reset.addEventListener("click", () => {
    Object.entries(defaults).forEach(([name, value]) => { els[name].value = value; });
    lastChanged = null;
    render(null);
    els.ch4.focus();
  });

  render(null);
})();
