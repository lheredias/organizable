export function renderToolTip() {
  return `
  <div class="tooltip">
    <input type="hidden" name="color" />
    <a class="tooltip-trigger" href="#color">
      <img 
        src="/assets/icons/paint.svg" 
        alt="paint"
        class="icon"
      />
    </a>
    <div class="tooltip-content hidden">
      <div class="tooltip-content__body">
        <div
          data-color="light-green"
          class="tooltip-option tooltip-option--light-green"
        ></div>
        <div data-color="red" class="tooltip-option tooltip-option--red"></div>
        <div
          data-color="blue"
          class="tooltip-option tooltip-option--blue"
        ></div>
        <div
          data-color="orange"
          class="tooltip-option tooltip-option--orange"
        ></div>
        <div
          data-color="purple"
          class="tooltip-option tooltip-option--purple"
        ></div>
        <div
          data-color="pink"
          class="tooltip-option tooltip-option--pink"
        ></div>
        <div
          data-color="green"
          class="tooltip-option tooltip-option--green"
        ></div>
        <div
          data-color="gray"
          class="tooltip-option tooltip-option--gray"
        ></div>
        <div
          data-color="sky-blue"
          class="tooltip-option tooltip-option--sky-blue"
        ></div>
      </div>
    </div>
  </div>
  `;
}